<template>
<b-container>
    <b-row align-v="center" style="min-height:100vh" class="text-center">
        <b-col cols="12" offset="0" md="8" offset-md="2">
            <b-jumbotron border-variant="danger">
                <template v-slot:header><h3 class="success">Váratlan hoba történt! :O</h3></template>

                <template v-slot:lead>
                    Nem sikerült kapcsolatot létesíteni a szerverrel. Kérlek látogass vissza késöbb.
                </template>

            </b-jumbotron>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
}
</script>

<style>

</style>