<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <RouterLink to="/" class="nav-link"><a class="navbar-brand" href="#">Logo</a></RouterLink>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/buildTeam" class="nav-link">Team Builder</RouterLink>
                    </li>
                  <li class="nav-item">
                        <RouterLink to="/team" class="nav-link">Team</RouterLink>
                    </li>
                </ul>
            <RouterLink to="/login" class="nav-link"><button type="button" class="btn btn-primary">Login</button></RouterLink>  
            
            </div>
        </div>
    </nav>
</template>