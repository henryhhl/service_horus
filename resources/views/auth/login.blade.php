
<!DOCTYPE html>
<html lang="es">
    <head>
        <title>Login </title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/png" href="/css/auth/images/icons/favicon.ico"/>

        <link rel="stylesheet" type="text/css" href="/css/auth/vendor/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/vendor/animate/animate.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/vendor/css-hamburgers/hamburgers.min.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/vendor/animsition/css/animsition.min.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/vendor/select2/select2.min.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/vendor/daterangepicker/daterangepicker.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/css/util.css">
        <link rel="stylesheet" type="text/css" href="/css/auth/css/main.css">

    </head>
    <body>

        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                    <form class="login100-form validate-form flex-sb flex-w" method="POST" action="{{ route('login') }}">
                        @csrf
                        <span class="login100-form-title p-b-32">
                            Iniciar sesión
                        </span>

                        <label class="txt1 p-b-11" for="login">
                            Usuario
                        </label>
                        <div class="wrap-input100 validate-input m-b-36{{ $errors->has('login') ? ' alert-validate' : '' }}"
                            data-validate="{{ $errors->first('login') }}"
                        >
                            <input class="input100" type="text" name="login"
                                placeholder="" required id="login"
                                autofocus
                                value="{{ old('login') }}"
                            >
                            <span class="focus-input100"></span>
                        </div>

                        <label class="txt1 p-b-11" for="password">
                            Contraseña
                        </label>
                        <div class="wrap-input100 validate-input m-b-12{{ $errors->has('password') ? ' alert-validate' : '' }}"
                            data-validate="{{ $errors->first('password') }}"
                        >
                            <span class="btn-show-pass">
                                <i class="fa fa-eye"></i>
                            </span>
                            <input class="input100" type="password" name="password"
                                placeholder="" required id="password"
                            />
                            <span class="focus-input100"></span>
                        </div>

                        <div class="flex-sb-m w-full pb-4">
                            <div class="contact100-form-checkbox">
                                <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
                                <label class="label-checkbox100" for="ckb1">
                                    Recordar usuario
                                </label>
                            </div>

                            <div>
                                <a href="#" class="txt3">
                                    ¿Has olvidado tu contraseña?
                                </a>
                            </div>
                        </div>

                        <div class="container-login100-form-btn">
                            <button type="submit" class="login100-form-btn">
                                Iniciar sesión
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>


        <div id="dropDownSelect1"></div>

        <script src="/css/auth/vendor/jquery/jquery-3.2.1.min.js"></script>
        <script src="/css/auth/vendor/animsition/js/animsition.min.js"></script>
        <script src="/css/auth/vendor/bootstrap/js/popper.js"></script>
        <script src="/css/auth/vendor/bootstrap/js/bootstrap.min.js"></script>
        <script src="/css/auth/vendor/select2/select2.min.js"></script>
        <script src="/css/auth/vendor/daterangepicker/moment.min.js"></script>
        <script src="/css/auth/vendor/daterangepicker/daterangepicker.js"></script>
        <script src="/css/auth/vendor/countdowntime/countdowntime.js"></script>
        <script src="/css/auth/js/main.js"></script>

    </body>
</html>

