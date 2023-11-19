<?php
    $name = $_POST['name'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // $to = "pavel.h@rpr.org.ru";
    $subject = "Запрос с сайта";
    $headers = "From: naumov.e@rpr.org.ru\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Cc: naumov.e@rpr.org.ru\r\n";
    
    $message = "
        <html>
            <body>
                <div>
                    <style>
                        body, html {padding: 0;margin: 0;width: 100%;height: 100%;box-sizing: border-box;}
                        div {background-color: #eeeeee;margin: 0px;padding: 10px;width: 100%;height: 100%;box-sizing: border-box;}
                        h2,p {margin: 0;padding: 10px 0;box-sizing: border-box;}
                        a,span {margin: 0px 5px;}
                    </style>
                    <h2>Запрос с сайта</h2>
                    <hr>
                    <p><strong>Имя: </strong><span style='letter-spacing:2px; text-decoration:none;color:#333;'>$name</span></p>
                    <p><strong>Телефон: </strong>
                        <a href='tel:$telephone'
                        style='letter-spacing:2px; text-decoration:none;color:#333;border-bottom: 1px #333 dotted;'>$telephone
                        </a>
                    </p>
                    <p>
                        <strong>Email: </strong>
                        <a href='mailto:$email'
                        style='letter-spacing:2px; text-decoration:none;color:#333;border-bottom: 1px #333 dotted;'>$email</a>
                    </p>
                    <hr>
                    <p><strong>Сообщение: </strong><span style='color:#333;'><span style='letter-spacing:2px; text-decoration:none;color:#333;'>$message</span></span></p>
                </div>
            </body>
        </html>
    ";

    if(mail($to, $subject, $message, $headers)) {
        echo "Письмо успешно отправлено";
    } else {
        http_response_code(500);
        echo "Ошибка при отправке письма";
    }

?>