<script>
export default {
    name: 'MainCards',
}
</script>

<template>
   <div class="d-md-flex gap-5 mt-5">
     <!-- card 1 -->
     <div class="doctor-container">
        <div class="img-container">
            <img src="../../../public/img/doctor-1.jpg" class="round-img" alt="doc">
        </div>
        <div class="position-relative info-doctor-container d-flex justify-content-center">
            <div class="info-doctor text-start width-80">
                <p class="m-0 text-white font-s-15 fw-medium pb-2 py-md-2">nome cognome</p>
                <p class="m-0 text-white font-s-13 pb-2 py-md-2">specializzazione</p>
            </div>
        </div>
    </div>
    <!-- card 2 -->
    <div class="doctor-container d-none d-md-block ms-5 me-5">
        <div class="img-container">
            <img src="../../../public/img/doctor-2.jpg" class="round-img" alt="doc">
        </div>
        <div class="position-relative info-doctor-container d-flex justify-content-center">
            <div class="info-doctor text-start width-80">
                <p class="m-0 text-white font-s-15 fw-medium pb-2 py-md-2">nome cognome</p>
                <p class="m-0 text-white font-s-13 pb-2 py-md-2">specializzazione</p>
            </div>
        </div>
    </div>
    <!-- card 3 -->
    <div class="doctor-container d-none d-lg-block">
        <div class="img-container">
            <img src="../../../public/img/doctor-3.jpg" class="round-img" alt="doc">
        </div>
        <div class="position-relative info-doctor-container d-flex justify-content-center">
            <div class="info-doctor text-start width-80">
                <p class="m-0 text-white font-s-15 fw-medium pb-2 py-md-2">nome cognome</p>
                <p class="m-0 text-white font-s-13 pb-2 py-md-2">specializzazione</p>
            </div>
        </div>
    </div>
   </div>
</template>

<style scoped lang="scss">
    @use'../../style/partials/palette.scss' as *;

    .doctor-container{
        width: 200px;
        height: 200px;
        .img-container{
            width: 100%;
            height: 100%;
            .round-img{
                border-radius: 20px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .info-doctor-container{
        top: -90px;
        padding: 20px;
        .info-doctor{
            background-color: rgb(13, 148, 129,0.8);
            border: 4px solid #0d9482;
            border-radius: 20px;
            padding-left: 10px;
            .font-s-13{
                font-size: 13px;
            }
            .font-s-15{
                font-size: 15px;
            }
        }
    }

    /*
        UTILITY
    */
    .width-80{
        width: 100%;
    }
    /*
        RESPONSIVITA'
    */

    @media screen and (min-width: 768px){
        // contenitore immagini
        .doctor-container{
            width: 300px;
            height: 300px;
        }

        .info-doctor-container{
        top: -130px;
        padding: 20px;
        .info-doctor{
            background-color: rgb(13, 148, 129,0.8);
            border: 4px solid #0d9482;
            border-radius: 20px;
            padding-left: 10px;
                .font-s-13{
                    font-size: 13px;
                }
                .font-s-15{
                    font-size: 15px;
                }
            }
        }
        .width-80{
            width: 80%;
        }
    }
</style>