<script>
export default {
    name: 'DownHeader',
}
</script>

<template>
    <nav class="navbar navbar-light rounded-pill nav-cstm p-0">
        <div class="container-fluid pe-0">
            <form class="d-flex align-items-center p-0 custom-search-bar">
                <div class="search-icon">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </div>
                <input class="form-control me-2 search-input" type="search"
                    placeholder="Cerca dottore, specializzazione, ..." aria-label="Search">
                <button class="btn btn-outline-success search-button" type="submit">Cerca ></button>
            </form>
        </div>
    </nav>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.nav-cstm {
    background-color: white;
    height: 3.75rem;
    border-top-right-radius: 1.5625rem;
    border-bottom-right-radius: 1.5625rem;

    > :first-child {
        height: 100%;
        border-top-right-radius: 1.5625rem;
        border-bottom-right-radius: 1.5625rem;
    }

    .custom-search-bar {
        position: relative;
        width: 100%;
        height: 3.75rem;
        background: white;
        border: .125rem solid white;
        border-radius: 1.5625rem;
        display: flex;
        align-items: center;
        padding: 0 .9375rem;

        .search-icon {
            background-color: white;
            color: black;
            padding: .5rem;
            border-right: none;
            border-top-left-radius: .3125rem;
            border-bottom-left-radius: .3125rem;
        }

        .search-input {
            border: none;
            flex-grow: 1;
            padding: .5rem;
            background-color: white;
            color: black;
            margin-left: .625rem;
        }

        .search-button {
            width: 70%;
            height: 100%;
            background-color: #00264C;
            color: white;
            border-color: #00264C;
            border-top-right-radius: 1.5625rem;
            border-bottom-right-radius: 1.5625rem;
            padding: .25rem .9375rem;
            font-size: .75rem;

            @media (min-width: 768px) {
                width: 50%;
                padding-top: .9375rem;
                padding-bottom: .9375rem;
                margin-right: .25rem;
            }

            @media (min-width: 992px) {
                width: 20%;
                padding-top: .9375rem;
                padding-bottom: .9375rem;
                margin-right: .25rem;
            }
        }
    }

    @media (min-width: 768px) {
        .custom-search-bar {
            height: auto;
        }
    }
}
</style>