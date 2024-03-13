// Track events on posts
const posts = document.querySelectorAll(".post");

posts.forEach((post) => {
  post.addEventListener("click", () => {
    // Track post click event
    console.log("Post clicked:", post.id);
  });
});

// Track events on chat
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message !== "") {
    // Track chat message sent event
    console.log("Chat message sent:", message);
  }
});

// Track events on emails
const emailForm = document.getElementById("emailForm");

emailForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Track email form submission event
  console.log("Email form submitted:", {
    name,
    email,
    message,
  });

  // Perform the actual form submission if needed
  // emailForm.submit();
});
