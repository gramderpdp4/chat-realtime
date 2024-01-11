<template>
    <div class="flex relative sm:flex-column flex-column xl:flex-row h-screen p-0 m-0 h-auto">
        <div class="xl:col-4">
            <div class="m-3">
                <div class="flex">
                    <Avatar icon="pi pi-user" class="mr-2 flex" size="xlarge" shape="circle" />
                    <div class="flex flex-column mt-3">
                        <p class="flex align-items-center font-bold text-base user-name">Olá {{ user !== null ? user.name :
                            'Carregando' }}</p>
                        <p class="flex mt-1 text-sm">{{ user !== null ? user.email : 'Carregando' }}</p>
                    </div>
                </div>
                <div class="mt-6 xl:max-w-17rem md:max-w-17rem">
                    <div v-if="!contacts">
                        <skeletonContacts />
                    </div>
                    <div v-else class="contacts-list">
                        <h2 class="mb-4 text-lg">Contatos</h2>
                        <a v-for="(contact, index) in contacts" class="flex mb-4 align-items-center flex"
                            @click="chatWithContactSelected(index, contact)">
                            <img :src="contact.photo" style="width: 3rem; height: 3rem; object-fit: contain;" />
                            <div>
                                <p class="ml-2 font-medium">{{ contact.name }}</p>
                            </div>
                        </a>
                    </div>
                    <Summary class="hidden xl:block"/>
                </div>
            </div>
        </div>
        <div class="xl:col-4">
            <div class="flex flex-column sm:flex-row xl:flex-row">
                <div class="col sm-screen justify-content-center flex">
                    <div class="phone lg:w-22rem md:22rem sm:w-12 xl:w-22rem w-11">
                        <div class="phone-container">
                            <div class="flex align-items-center">
                                <div>
                                    <div v-if="!contactSelected"></div>
                                    <div v-else><img :src="contactSelected.photo" class="w-3rem h-3rem" /></div>
                                </div>
                                <div class="ml-2">
                                    <div v-if="!contactSelected" class="ml-2 text-center">Carregando</div>
                                    <div v-else class="text-2x1 font-medium">{{ contactSelected.name }}</div>
                                </div>
                            </div>
                            <Divider />
                            <div class="messages max-h-24rem overflow-y-scroll">
                                <div v-if="contactSelected">
                                    <div class="justify-content-center flex" v-if="chat.messages == null">
                                        <ProgressSpinner />
                                    </div>
                                    <div v-if="chat.messages == 'empty'">
                                        <p class="text-center">Nenhuma mensagem</p>
                                    </div>
                                    <div v-if="chat.messages != 'empty' && chat.messages != null">
                                        <div v-for="(message, key) in chat.messages">
                                            <div class="flex mb-3">
                                                <p class="p-2 border-round text-xs font-medium"
                                                    :class="message.type == 'you' ? 'message-you' : 'message-friend'">
                                                    {{ message.message }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="flex align-items-center h-23rem">
                                    <p class="text-center text-lg ml-2">Clique em um contato para iniciar</p>
                                </div>
                            </div>
                            <div class="phone-keyboard border-round-lg absolute bottom-0 left-0 p-2">
                                <span v-if="contactSelected != null" class="p-input-icon-right w-full">
                                    <form @submit.prevent="sendMessage('you')" class="w-full">
                                        <InputText class="w-full input-message" :placeholder="'Mensagem para ' + firstName"
                                            v-model="chat.messageYou" :value="chat.messageYou" required />
                                        <div class="flex absolute right-0 -mt-6">
                                            <div class="col">
                                                <Button size="small" rounded raised text class="p-1"
                                                    @click="showPopupEmojis('you', $event)">
                                                    <span class="material-symbols-outlined">
                                                        mood
                                                    </span>
                                                </Button>
                                            </div>
                                            <div class="col">
                                                <Button type="submit" size="small" rounded class="p-1">
                                                    <span class="pi material-symbols-outlined">
                                                        send
                                                    </span>
                                                </Button>
                                            </div>
                                            <Picker color="#3B82F6" :perLine="7" :showPreview="false" :i18n="chat.i18n" title="André Dev"
                                                class="hidden picker-emoji-you md" emojiTooltip="true"
                                                :data="chat.emojiYouIndex" set="facebook"
                                                @select="(event) => showEmoji(event, 'you')" />
                                        </div>
                                    </form>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col justify-content-center flex xl:ml-5">
                    <div class="phone lg:w-22rem md:22rem sm:w-12 xl:w-22rem w-11">
                        <div class="phone-container">
                            <div class="flex align-items-center">
                                <div>
                                    <Avatar icon="pi pi-user" class="mr-2 flex w-3rem h-3rem" shape="circle" />
                                </div>
                                <div class="ml-2">
                                    <div v-if="!contactSelected">Carregando</div>
                                    <div v-else class="text-2x1 font-medium">{{ user.name }}</div>
                                </div>
                            </div>
                            <Divider />
                            <div class="messages max-h-24rem overflow-y-scroll">
                                <div v-if="contactSelected">
                                    <div class="justify-content-center flex" v-if="chat.messages == null">
                                        <ProgressSpinner />
                                    </div>
                                    <div v-if="chat.messages == 'empty'">
                                        <p class="text-center">Nenhuma mensagem</p>
                                    </div>
                                    <div v-if="chat.messages != 'empty' && chat.messages != null">
                                        <div v-for="(message, key) in chat.messages">
                                            <div class="flex mb-3">
                                                <p class="p-2 border-round text-xs font-medium"
                                                    :class="message.type == 'friend' ? 'message-you' : 'message-friend'">
                                                    {{ message.message }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="phone-keyboard border-round-lg absolute bottom-0 left-0 p-2">
                                <span v-if="contactSelected != null" class="p-input-icon-right w-full">
                                    <form @submit.prevent="sendMessage('friend')" class="w-full">
                                        <InputText class="v-full w-full input-message"
                                            :placeholder="'Mensagem para ' + user.name" v-model="chat.messageFriend"
                                            :value="chat.messageFriend" required />
                                        <div class="flex absolute right-0 -mt-6">
                                            <div class="col">
                                                <Button size="small" rounded raised text class="p-1"
                                                    @click="showPopupEmojis('friend', $event)">
                                                    <span class="material-symbols-outlined">
                                                        mood
                                                    </span>
                                                </Button>
                                            </div>
                                            <div class="col">
                                                <Button type="submit" size="small" rounded class="p-1">
                                                    <span class="pi material-symbols-outlined">
                                                        send
                                                    </span>
                                                </Button>
                                            </div>
                                            <Picker color="#3B82F6" :perLine="7" :showPreview="false" :i18n="chat.i18n" title="André Dev"
                                                class="hidden picker-emoji-friend" emojiTooltip="true"
                                                :data="chat.emojiFriendIndex" set="facebook"
                                                @select="(event) => showEmoji(event, 'friend')" />
                                        </div>
                                    </form>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Summary class="block xl:hidden m-3 mt-5"/>
</template>
<script>
import app from '@/js/firebase'
import { getDatabase, onChildChanged, onValue, push, ref, update } from 'firebase/database';
import { userUID, logout } from '@/js/signin-user.js'
import skeletonContacts from '@/components/skeleton-contacts.vue';
import Summary from '@/components/summary.vue';
import moment from 'moment-timezone';
import data from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";

const db = getDatabase(app);

let emojiYouIndex = new EmojiIndex(data),
    emojiFriendIndex = new EmojiIndex(data);

export default {
    data: () => {
        return {
            chat: {
                messageYou: '',
                messageFriend: '',
                messages: null,
                messageType: null,
                emojiYouIndex: emojiYouIndex,
                emojiFriendIndex: emojiFriendIndex,
                emojisOutput: "",
                pickerEmojiVisibility: false,
                i18n: {
                    search: 'Buscar',
                    notfound: 'Nenhum emoji encontrado',
                    categories: {
                        search: 'Resultados',
                        recent: 'Usados com frequência',
                        smileys: 'Emoticons',
                        people: 'Pessoas e Corpo',
                        nature: 'Animais e Natureza',
                        foods: 'Comida e Bebida',
                        activity: 'Atividade',
                        places: 'Viagens e Lugares',
                        objects: 'Objetos',
                        symbols: 'Símnolos',
                        flags: 'Bandeiras',
                        custom: 'Personalizado',
                    }
                }
            },
            contacts: null,
            user: null,
            contactSelected: null,
            uid: null
        }
    },

    computed: {
        firstName() {
            return this.contactSelected.name.split(' ').slice(0, 1)
        },

        messageWithIcon() {
            return this.chat.message = this.chat.message += this.chat.emojisOutput
        },
    },

    mounted() {
        const vue = this;

        setTimeout(() => {
            this.getContacts();
        }, 0);
    },

    components: {
        skeletonContacts,
        Picker,
        Summary
    },

    methods: {
        async getContacts() {
            try {
                const userFirebase = await userUID()

                this.uid = userFirebase.uid

                const path = ref(db, `users/${this.uid}`);

                onValue(path, (data) => {
                    const died = data.val();
                    const { contacts, ...user } = died

                    this.user = user
                    this.contacts = contacts

                    console.log(this.contacts)
                })
            } catch (error) {
                console.log(error)
            }
        },

        chatWithContactSelected(key, contact) {
            this.contactSelected = null;
            this.chat.messages = null;

            const path = ref(db, `users/${this.uid}/chats/${key}`);

            const { name, email, photo } = contact

            const details_chat = {
                contactKey: key,
                contactName: name,
                contactEmail: email,
                contactPhoto: photo,
            }

            update(path, details_chat)
                .then(() => {
                    this.getMessagesContact()
                })

            this.contactSelected = {
                name: name,
                email: email,
                photo: photo,
                key: key
            }
        },

        getMessagesContact() {
            const path = ref(db, `users/${this.uid}/chats/${this.contactSelected.key}/messages`);

            onValue(path, (snapshot) => {
                if (snapshot.exists()) this.chat.messages = snapshot.val()
                else this.chat.messages = 'empty'

                setTimeout(() => {
                    this.scrollToBottom()
                }, 0);
            })
        },

        sendMessage(type) {
            const path = ref(db, `users/${this.uid}/chats/${this.contactSelected.key}/messages`);

            const message = {
                message: type == 'you' ? this.chat.messageYou : this.chat.messageFriend,
                key: this.contactSelected.key,
                name: this.contactSelected.name,
                type: type,
                created_at: moment().format("DD/MM/YYYY HH:mm:ss"),
                time: moment().format("HH:mm:ss"),
                send: this.uid
            }

            if (type == 'you') this.chat.messageYou = ''
            else this.chat.messageFriend = ''

            push(path, message)
        },


        showEmoji(emoji, type) {
            if (type == "you") this.chat.messageYou += emoji.native
            else this.chat.messageFriend += emoji.native;
        },

        scrollToBottom() {
            const elements = document.querySelectorAll(".messages")

            elements.forEach(el => {
                el.scrollTop = el.scrollHeight
            })
        },

        showPopupEmojis(type, event) {
            if (event == true) {
                const all = document.querySelectorAll(".emoji-mart:not(.hidden)");

                all.forEach(el => {
                    el.classList.toggle("hidden")
                })
            } else {
                console.log(event.target.getBoundingClientRect())
                document.querySelector(`.picker-emoji-${type}`).classList.toggle("hidden")
                const el = document.querySelector(".input-message").getBoundingClientRect();

                document.documentElement.style.setProperty("--emoji-mart-bottom", `${(el.bottom - el.bottom) + 50}px`)

                document.documentElement.style.setProperty("--emoji-mart-left", `${(el.left - el.left) - 150}px`)

                document.removeEventListener("click", this.eventListenerClosePopupEmojis, false)
                setTimeout(() => {
                    document.addEventListener("click", this.eventListenerClosePopupEmojis, false)
                }, 50)
            }
        },

        eventListenerClosePopupEmojis(event) {
            const box_emoji_mart_exists = document.querySelector(".emoji-mart:not(.hidden)");

            if (!box_emoji_mart_exists.classList.contains("hidden")) {
                let target = event.target;

                do {
                    if (target == box_emoji_mart_exists) {
                        console.log('clique dentro')
                        return
                    }

                    target = target.parentNode;
                } while (target)

                this.showPopupEmojis(null, true)
            }
        }
    }
}
</script>
<style scoped>
.phone {
    padding: 12px;
    height: 38.5rem;
    border-radius: 54px;
    border: 5px solid #84868a;
    align-self: center;
    position: relative;
    box-sizing: border-box;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-thumb {
    background-color: #6a6a6a;
    border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}

::-webkit-scrollbar-track:hover {
    background-color: #d4d4d4;
}

.phone .message-you {
    background-color: var(--color-primary);
    color: var(--color-white);
}

.phone .message-friend {
    background-color: #d9dbdf;
    margin-left: auto;
    position: relative;
}

.phone .phone-container {
    top: 40px;
    position: relative;
    height: 33rem;
}

.phone .phone-keyboard {
    width: 100%;
    height: 40px;
}

.phone::before {
    content: '';
    position: absolute;
    width: 80px;
    height: 20px;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
    background: #000;
    z-index: 100;
    pointer-events: none;
    border-radius: 999px;
}

.contacts-list a {
    cursor: pointer
}

.user-name {
    color: var(--color-primary);
}

.emoji-mart-static {
    position: absolute;
    z-index: 5;
    bottom: var(--emoji-mart-bottom);
    left: var(--emoji-mart-left);
}

</style>