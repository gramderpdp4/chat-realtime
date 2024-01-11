import DynamicDialog from 'primevue/dynamicdialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';
import Avatar from 'primevue/avatar'
import Skeleton from 'primevue/skeleton';
import Divider from 'primevue/divider'
import OverlayPanel from 'primevue/overlaypanel';
import ProgressSpinner from 'primevue/progressspinner';

export const addComponents = (app) => {
    app.component("DynamicDialog", DynamicDialog)
    app.component("InputText", InputText)
    app.component("Button", Button)
    app.component("InlineMessage", InlineMessage)
    app.component("Avatar", Avatar)
    app.component("Skeleton", Skeleton)
    app.component("Divider", Divider)
    app.component("OverlayPanel", OverlayPanel)
    app.component("ProgressSpinner", ProgressSpinner)
}