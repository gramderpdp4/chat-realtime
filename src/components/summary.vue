<template>
    <div class="relative md:max-w-25rem">
        <p class="font-semibold text-sm">
            Leve seu projeto ou empresa para o próximo nível utilizando o que há de mais moderno em tecnologia.
            Vamos conversar?
        </p>
        <div class="flex flex-row">
            <a class="flex flex-row align-items-center" href="https://github.com/gramderpdp4" target="_blank">
                <img :src="github">
                <h4 class="ml-1 font-normal" style="color: #000000">André Dev</h4>
            </a>
            <Divider layout="vertical" />
            <a class="flex flex-row align-items-center" href="https://wa.me/+5582981731623" target="_blank">
                <img :src="whatsapp">
                <h4 class="ml-1 font-normal" style="color: #000000">André Dev</h4>
            </a>
        </div>
    </div>
</template>
<script>
    import github from '@/assets/github.svg';
    import whatsapp from '@/assets/whatsapp.svg';

    export default {
        data: () => {
            return {
                whatsapp: whatsapp,
                github: github
            }
        }
    }
</script>