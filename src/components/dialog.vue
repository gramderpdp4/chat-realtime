<template>
    <form @submit.prevent="submit">
        <div class="flex flex-column gap-2">
            <label for="username">Nome</label>
            <InputText id="username" type="text" v-model="formRegister.name" required/>
        </div>
        <div class="flex flex-column gap-2 mt-2">
            <label for="email">E-mail</label>
            <InputText id="email" type="email" v-model="formRegister.email" required/>
        </div>
        <div class="flex flex-column gap-2 mt-2">
            <label for="password">Senha</label>
            <InputText id="password" type="password" v-model="formRegister.password" required/>
        </div>
        <Button label="Continuar" class="mt-5 w-full" type="submit" :loading="loading"/>
    </form>
    <div v-if="formInfo.info">
        <InlineMessage severity="error" class="mt-4">
            <p class="pl-2">{{ formInfo.message }}</p>
        </InlineMessage>
    </div>
</template>
<script>
    import { inject } from 'vue';
    import { createUser } from '@/js/signup-user.js'
    import app from '@/js/firebase'
    import { getDatabase, push, onValue, ref } from 'firebase/database'
    import { signInUser } from '@/js/signin-user';

    const db = getDatabase(app);

    export default {
        data: () => {
            return {
                loading: false,
                dialogClose: null,
                formRegister: {
                    name: null,
                    email: null,
                    password: null
                },
                formInfo: {
                    info: false,
                    message: ''
                }
            }
        },

        methods: {
            async submit() {
                this.loading = true
                createUser(this.formRegister.email, this.formRegister.password, this.formRegister.name)
                .then( async () => {
                   const { uid } = await signInUser(this.formRegister.email, this.formRegister.password)

                   this.dialogClose.close()
                   this.$router.push("/panel")
                })
                .catch(error => {
                    this.loading = false
                    switch (error) {
                        case 'auth/email-already-in-use':
                            this.formInfo.info = true
                            this.formInfo.message = 'Esse usuário já está cadastrado'
                        break;

                        case 'auth/weak-password':
                        this.formInfo.info = true
                        this.formInfo.message = 'Sua senha deve conter no mínimo 6 caracteres'
                        break;
                    }
                })
                
            }
        },

        mounted() {
            this.dialogClose = inject('dialogRef');
        }
    }
</script>