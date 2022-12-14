


<template>
        <div class="row">
            <div class="col-lg-10 col-xl-11 card flex-row mx mx-auto px-0">
                <div class="card-body mx-5 my-4">
                    <h4 class="text-center px-3">SE CONNECTER</h4>  
                    <form class="my-4 px-3">

                        <div class="d-flex form-row align-items-center mb-3">
                            <div class="form-group col-md-5">
                                <label class="text-center" for="login">PSEUDO</label>
                                <input type="text" class="form-control w-100" name="" id="pseudoConn" placeholder="Entre ton pseudo" required>
                            </div>
                        </div>

                        <div class="d-flex form-row align-items-center mb-3">
                            <div class="form-group col-md-5">
                                <label class="text-center" for="mdp">MOT DE PASSE</label>
                                <input type="new-password" class="form-control w-100" id="mdpConn" placeholder="Entre ton mot de passe" required>
                            </div>
                        </div>

                        <div class="form-check mb-3">
                          <input class="form-check-input" type="checkbox" value="lsRememberMe" id="rememberMe">
                          <label class="form-check-label px-0 py-1" for="rememberMe">Se souvenir de moi</label>
                        </div>
                          <div class="d-flex justify-content-center">
                            <button class="btn btn-primary rounded-pill" id="btnConn" type="submit">Se connecter</button>
                          </div>

                          <!-- Create an alert component with bootstrap that is not displayed by default-->
                         <div class="alert alert-danger mt-2 d-none" id="messageBoard"></div>
                    </form>
                  
                </div>
            </div>
        </div>
    
        <div class="row">
                <div class="col-lg-10 col-xl-11 card flex-row mx mx-auto px-0">
                    <div class="card-body">
                        <h4 class="text-center px-3">S'INSCRIRE</h4>
                        <form class="my-4 px-3">
                        
                            <div class="d-flex form-row align-items-center mb-3">
                            <div class="form-group col-md-5">
                                <label class="text-center" for="pseudo">PSEUDO</label>
                                <input type="text" class="form-control w-100" id="pseudoInscr" placeholder="Entrez votre pseudo">

                            </div>
                            </div>
                            
                            <div class="d-flex form-row align-items-center mb-3">
                            <div class="form-group col-md-5">
                                <label class="text-center" for="mdp">MOT DE PASSE</label>
                                <input type="new-password" class="form-control w-100" id="mdpInscr" placeholder="Entrez votre mot de passe">
                            </div>
                            <div class="form-group col-md-2"></div>
                            <div class="form-group col-md-5">
                                <label class="text-center" for="validatePwd">CONFIRMER MOT DE PASSE</label>
                                <input type="new-password" class="form-control w-100" id="validatePwd" placeholder="Confirmation mot de passe">
                            </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-primary rounded-pill" id="btnInscr" type="submit">S'inscrire</button>
                            </div>  
                        </form> 
                    </div>
            </div>
        </div>
</template>