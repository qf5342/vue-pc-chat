<template>
    <section>
        <div class="message-time-container" v-bind:class="{checked:sharedPickState.messages.indexOf(message) >= 0}">
            <p v-if="this.message._showTime" class="time">{{ message._timeStr }}</p>
            <div class="message-content-container"
                 v-bind:class="{checked:sharedPickState.messages.indexOf(message) >= 0}">
                <input id="checkbox" v-if="sharedConversationState.enableMessageMultiSelection" type="checkbox"
                       class="checkbox"
                       :value="message"
                       placeholder="" v-model="sharedPickState.messages">

                <div class="message-avatar-content-container">
                    <!-- 文件的进度条有点特殊，有进度的消息的进度条有点特殊 -->
                    <FadeLoader :loading="message.status === 0 && message.messageContent.type !== 5" color="#848484" style="margin:10px" width="3px" height="8px" margin="2px" radius="8px"> </FadeLoader>
                    <i v-if="message.status === 2" class="icon-ion-close-circled" style="color: red" @click="resend"/>
                    <div class="flex-column flex-align-end">
                        <MessageContentContainerView :message="message"
                                                     class="message-content-container-view"
                                                     v-bind:class="{highlight:highLight}"
                                                     @contextmenu.prevent.native="openMessageContextMenu($event, message)"/>
                        <QuoteMessageView v-if="quotedMessage"
                                          style="padding: 5px 0; max-width: 80%"
                                          :message="message"
                                          :quoted-message="quotedMessage"
                                          :enable-message-preview="true"
                                          :message-digest="this.message.messageContent.quoteInfo.messageDigest"
                                          :show-close-button="false"/>
                    </div>

                    <tippy
                        :to="'#infoTrigger' + this.message.messageId"
                        :animate-fill="false"
                        placement="left"
                        distant="7"
                        theme="light"
                        animation="fade"
                        trigger="click"
                    >
                        <template #content>
                            <UserCardView v-on:close="closeUserCard" :user-info="message._from"/>
                        </template>
                    </tippy>

                    <img ref="userCardTippy"
                         :id="'infoTrigger' + this.message.messageId"
                         class="avatar"
                         @click="onClickUserPortrait(message.from)"
                         draggable="false"
                         :src="message._from ? message._from.portrait : ''">
                </div>
            </div>
            <p v-if="shouldShowMessageReceipt" class="receipt" @click="showMessageReceiptDetail">
                {{ messageReceipt }}</p>
        </div>
    </section>

</template>

<script>
import UserCardView from "../../user/UserCardView.vue";
import Message from "../../../../wfc/messages/message";
import MessageContentContainerView from "./MessageContentContainerView.vue";
import store from "../../../../store";
import LoadingView from "../../../common/LoadingView.vue";
import wfc from "../../../../wfc/client/wfc";
import ConversationType from "../../../../wfc/model/conversationType";
import {gte} from "../../../../wfc/util/longUtil";
import MessageReceiptDetailView from "./MessageReceiptDetailView.vue";
import QuoteMessageView from "./QuoteMessageView.vue";
import Config from "../../../../config";
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

export default {
    name: "NormalOutMessageContentView",
    props: {
        message: {
            type: Message,
            required: true,
        },
    },
    data() {
        return {
            sharedConversationState: store.state.conversation,
            sharedPickState: store.state.pick,
            highLight: false,
            quotedMessage: null,
        }
    },
    components: {
        QuoteMessageView,
        LoadingView,
        FadeLoader,
        MessageContentContainerView,
        UserCardView,
        // TextMessageContentView,

    },
    mounted() {
        this.$eventBus.$on('contextMenuClosed', this.onContextMenuClosed);

        if (this.message.messageContent.quoteInfo) {
            let messageUid = this.message.messageContent.quoteInfo.messageUid;
            let msg = store.getMessageByUid(messageUid);
            if (!msg) {
                wfc.loadRemoteMessage(messageUid, (ms) => {
                    msg = store._patchMessage(ms);
                    this.quotedMessage = msg;
                }, err => {
                    console.log('load remote message error', messageUid, err)
                })
            } else {
                this.quotedMessage = msg;
            }
        }
    },
    beforeUnmount() {
        this.$eventBus.$off('contextMenuClosed', this.onContextMenuClosed);
    },

    methods: {
        onContextMenuClosed() {
            this.highLight = false;
        },
        onClickUserPortrait(userId) {
            wfc.getUserInfo(userId, true);
        },
        closeUserCard() {
            console.log('closeUserCard', this.$refs["userCardTippy"]);
            this.$refs["userCardTippy"]._tippy.hide();
        },
        resend() {
            wfc.deleteMessage(this.message.messageId);
            wfc.sendMessage(this.message);
        },
        openMessageContextMenu(event, message) {
            this.$emit('openMessageContextMenu', event, message)
            this.highLight = true;
        },

        showMessageReceiptDetail() {
            let conversation = this.message.conversation;
            if (conversation.type === ConversationType.Single) {
                return;
            }

            let timestamp = this.message.timestamp;
            let readEntries = this.sharedConversationState.currentConversationRead;

            if (conversation.type === ConversationType.Group) {
                let groupMembers = wfc.getGroupMemberIds(conversation.target, false);
                if (!groupMembers || groupMembers.length === 0) {
                    // do nothing
                } else {
                    let readUserIds = [];
                    let unreadUserIds = [];
                    groupMembers.forEach(memberId => {
                        let readDt = readEntries ? readEntries.get(memberId) : 0;
                        if (readDt && gte(readDt, timestamp) || this.message.from === memberId) {
                            readUserIds.push(memberId);
                        } else {
                            unreadUserIds.push(memberId)
                        }
                    });
                    let readUsers = store.getUserInfos(readUserIds, conversation.target)
                    let unreadUsers = store.getUserInfos(unreadUserIds, conversation.target)

                    this.$modal.show(
                        MessageReceiptDetailView,
                        {
                            readUsers: readUsers,
                            unreadUsers: unreadUsers,
                        }, null, {
                            name: 'message-receipt-detail-modal',
                            width: 480,
                            height: 300,
                            clickToClose: true,
                        }, {})
                }
            }
        },
    },

    computed: {
        messageReceipt() {
            let conversation = this.message.conversation;
            let timestamp = this.message.timestamp;
            let receiptDesc = ''
            let readEntries = this.sharedConversationState.currentConversationRead;

            if (conversation.type === ConversationType.Single) {
                let readDt = readEntries ? readEntries.get(conversation.target) : 0
                readDt = readDt ? readDt : 0;

                if (gte(readDt, timestamp)) {
                    receiptDesc = "已读";
                } else {
                    receiptDesc = "未读";
                }
            } else {
                let groupMembers = wfc.getGroupMemberIds(conversation.target, false);
                if (!groupMembers || groupMembers.length === 0) {
                    receiptDesc = '';
                } else {
                    let memberCount = groupMembers.length;
                    let readCount = 0;

                    let readUserIds = [];
                    let unreadUserIds = [];
                    groupMembers.forEach(memberId => {
                        let readDt = readEntries ? readEntries.get(memberId) : 0;
                        if (readDt && gte(readDt, timestamp) || this.message.from === memberId) {
                            readCount++;
                            readUserIds.push(memberId);
                        } else {
                            unreadUserIds.push(memberId)
                        }
                    });
                    receiptDesc = `已读 ${readCount}/${memberCount}`
                }
            }
            return receiptDesc;
        },

        isDownloading() {
            return store.isDownloadingMessage(this.message.messageId);
        },

        shouldShowMessageReceipt() {
            let show = false;
            if (this.message.conversation.type === ConversationType.Group) {
                show = this.sharedConversationState.isGroupMessageReceiptEnable;
            } else if (this.message.conversation.type === ConversationType.Single) {
                show = this.sharedConversationState.isMessageReceiptEnable && ["FireRobot", Config.FILE_HELPER_ID].indexOf(this.message.conversation.target) < 0;
            }
            return show;
        }
    },

}
</script>

<style lang="css" scoped>

.message-time-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.message-time-container.checked {
    background-color: #e7e7e7;
}

.message-time-container .time {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
    color: #b4b4b4;
    font-size: 10px;
    background-color: #f3f3f3;
}

.message-time-container .receipt {
    margin-right: 70px;
    font-size: 12px;
    color: #b4b4b4;
}

.message-content-container {
    width: 100%;
    display: flex;
    padding: 10px 20px 4px 20px;
    justify-content: space-between;
    align-items: center;
    position: relative;
}


.message-avatar-content-container {
    display: flex;
    max-width: calc(100% - 60px);
    overflow: hidden;
    /*max-height: 800px;*/
    margin-left: auto;
    text-overflow: ellipsis;
    align-items: flex-start;
}

.message-avatar-content-container .avatar {
    width: 40px;
    height: 40px;
    border-radius: 3px;
}

.message-content-container-view.highlight {
    background-color: #dadada;
    opacity: 0.5;
    --out-arrow-color: #dadada !important;
}

</style>
