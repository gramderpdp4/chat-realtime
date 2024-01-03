<template>
  <DynamicDialog />
  <RouterView />
</template>
<script>
    import { defineAsyncComponent } from 'vue';
    import { RouterView } from 'vue-router';
    import app from './js/firebase';
    import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
    const Dialog = defineAsyncComponent(() => import('./components/dialog.vue'));

    const auth = getAuth(app);
    
    export default {
        data: () => {
          return {
           
          }
        },

        mounted() {
          onAuthStateChanged(auth, (state) => {
            if (state && state.uid) {
              this.$router.push("/panel")
            } else {
              this.$dialog.open(Dialog, {
                props: {
                    modal: true,
                    header: 'Vamos começar ?',
                    closeOnEscape: false,
                    closable: false
                },
              })  
            }
          })
        }
    }
</script>