const notifications = [
    {
        title: "Welcome!",
        message: "Welcome to Nova Flex",
        img: "img/welcome.png",
    },
    {
        title: "Discord",
        message: "Join our discord ",
        img: "img/welcome.png",
    },
    {
        title: "System Update",
        message: "Maintenance scheduled at 3:00 AM tonight.",
        img: "img/welcome.png",
        link: "https://discord.gg/sjekF4TeSA" // Redirect link to Discord
    },
];

let currentIndex = 0;

function showNotification() {
    const container = document.getElementById("notification-container");

    // Clear existing notification
    container.innerHTML = "";

    // Create new notification
    const notificationData = notifications[currentIndex];
    const notificationDiv = document.createElement("div");
    notificationDiv.className = "notification show";
    notificationDiv.innerHTML = `
        <img src="${notificationData.img}" alt="Notification Image" class="notification-img">
        <div class="notification-content">
            <h4 class="notification-title">${notificationData.title}</h4>
            <p class="notification-message">${notificationData.message}</p>
        </div>
    `;

    // Append and show
    container.appendChild(notificationDiv);
    container.classList.add("show");

    // Hide notification after 10 seconds
    setTimeout(() => {
        notificationDiv.classList.remove("show");
        container.classList.remove("show");
    }, 10000);

    // Move to the next notification
    currentIndex = (currentIndex + 10) % notifications.length;
}

// Start rotating notifications every 12 seconds
setInterval(showNotification, 10000);


