import { showToast, showSuccessToast, showFailToast, showConfirmDialog } from 'vant';

export default {
    // 消息提示
    msg (content) {
        showToast(content)
    },
    // 错误消息
    msgError (content) {
        showFailToast(content)
    },
    // 成功消息
    msgSuccess (content) {
        showSuccessToast(content)
    },
    showConfirm ({ title, message }) {
        return showConfirmDialog({
            title,
            message,
        })
    }
}
