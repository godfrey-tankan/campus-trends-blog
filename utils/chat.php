<?php
// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Send email
    $to = "your-email@example.com";
    $subject = "New Message from Website";
    $emailBody = "Name: $name\nEmail: $email\nMessage: $message";
    $headers = "From: $email";

    if (mail($to, $subject, $emailBody, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}

// Handle chat messages
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["chat_message"])) {
    // Process chat message
    $message = $_POST["chat_message"];

    // Save or handle the chat message as needed
    // ...

    // Send a response if necessary
    $response = "Thank you for your message!";
    echo json_encode($response);
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Contact Form and Chat Example</title>
</head>
<body>
    <h1>Contact Form</h1>
    <form method="POST" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <label for="name">Name:</label>
        <input type="text" name="name" required><br><br>
        <label for="email">Email:</label>
        <input type="email" name="email" required><br><br>
        <label for="message">Message:</label>
        <textarea name="message" required></textarea><br><br>
        <input type="submit" value="Send Message">
    </form>

    <hr>

    <h1>Chat</h1>
    <div id="chatMessages"></div>
    <input type="text" id="chatInput" placeholder="Type your message...">
    <button id="sendButton">Send</button>

    <script>
        // Chat functionality
        const chatMessages = document.getElementById("chatMessages");
        const chatInput = document.getElementById("chatInput");
        const sendButton = document.getElementById("sendButton");

        sendButton.addEventListener("click", function() {
            const message = chatInput.value.trim();
            if (message !== "") {
                sendMessage(message);
                chatInput.value = "";
            }
        });

        function sendMessage(message) {
            // Perform an AJAX request to handle the chat message
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "<?php echo $_SERVER["PHP_SELF"]; ?>", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        displayChatMessage(response);
                    } else {
                        console.error("Failed to send chat message.");
                    }
                }
            };
            const params = "chat_message=" + encodeURIComponent(message);
            xhr.send(params);
        }

        function displayChatMessage(message) {
            const chatMessageElement = document.createElement("p");
            chatMessageElement.textContent = message;
            chatMessages.appendChild(chatMessageElement);
        }
    </script>
</body>
</html>