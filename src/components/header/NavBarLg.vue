<script>
export default {
    name: 'NavBarLg',
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white rounded-pill nav-cstm">
        <div class="input-group">
            <span class="input-group-text rounded-pill rounded-end bg-white" id="basic-addon1"><font-awesome-icon
                    icon="fa-solid fa-magnifying-glass" />
            </span>
            <form class="d-flex" role="search">
                <input class="form-control me-1 p-0 with-border" type="search" placeholder="ricerca..." aria-label="Search">
                <span class="input-group-text rounded-pill rounded-end bg-white p-0" id="basic-addon1">
                    <font-awesome-icon icon="fa-solid fa-location-dot" />
                </span>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
    <div>ciao</div>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.nav-cstm {
    height: 60px;

    .input-group-text.rounded-pill.rounded-end.bg-white {
        height: auto;
        padding: 0px 5px 0px 15px;
        border-color: white;
    }

    input.form-control.me-1.p-0.with-border {
        width: 60px;
        font-size: 11px;
        height: auto;
        border: none;
    }
}
</style>