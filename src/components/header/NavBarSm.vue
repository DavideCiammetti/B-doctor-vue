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
    height: 60px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;

    > :first-child {
        height: 100%;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
    }

    .custom-search-bar {
        position: relative;
        width: 100%;
        height: 60px;
        background: white;
        border: .125rem solid white;
        border-radius: 25px;
        display: flex;
        align-items: center;
        padding: 0 15px;

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
            outline: none;
            flex-grow: 1;
            padding: .5rem;
            background-color: white;
            color: black;
            margin-left: 10px;
        }

        .search-button {
            width: 70%;
            height: 100%;
            background-color: #00264C;
            color: white;
            border-color: #00264C;
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
            padding: 4px 15px;
            font-size: 12px;

            @media (min-width: 768px) {
                width: 50%;
                padding-top: 15px; // Padding in alto
                padding-bottom: 15px; // Padding in basso
                margin-right: 4px;
            }

            @media (min-width: 992px) {
                width: 20%;
                padding-top: 15px; // Padding in alto
                padding-bottom: 15px; // Padding in basso
                margin-right: 4px;
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