<?php
    $name = $_POST['name'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "pavel.h@rpr.org.ru";
    $subject = "Запрос с сайта";
    $headers = "From: naumov.e@rpr.org.ru\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Cc: naumov.e@rpr.org.ru\r\n";
    
    $message = "
        <html>
            <body>
                <div>
                    <style>
                        body{background-color:#eee; padding:20px; margin:0px;}
                        div,h2{margin:0px; padding:0px;}
                        p{padding:10px 20px; display:block;}
                        a{margin:0px 5px;}
                    </style>
                    <h2>Запрос с сайта</h2>
                    <p><strong>Имя: </strong>$name</p>
                    <p><strong>Телефон: </strong><a href='tel:$telephone' style='letter-spacing:2px; line-hight:1em; text-decoration:none;color:#333;border-bottom: 1px #333 dotted;'>$telephone</a></p>
                    <p><strong>Email: </strong><a href='mailto:$email' style='letter-spacing:2px; line-hight:1em; text-decoration:none;color:#333;border-bottom: 1px #333 dotted;'>$email</a></p>
                    <p><strong>Сообщение: </strong><span style='color:#333;'>$message</span></p>
                </.div>
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