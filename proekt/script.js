let currentUsername = '';
const likeCounts = {};
const likesStatus = {};
const commentsData = {};

function loginAlert() {
    const username = prompt("Enter your username:");
    if (username) {
        currentUsername = username;
        const welcomeMessage = document.getElementById("welcomeMessage");
        welcomeMessage.textContent = `Welcome, ${username}!`;
        welcomeMessage.removeAttribute("onclick");
    } else {
        alert("Login cancelled.");
    }
}

function navigate(pageId, addToHistory = true) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = page.id === pageId ? 'block' : 'none';
    });
    if (addToHistory) {
        history.pushState({ pageId: pageId }, "", `#${pageId}`);
    }
}

window.addEventListener("popstate", (event) => {
    if (event.state && event.state.pageId) {
        navigate(event.state.pageId, false);
    } else {
        navigate("home", false);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const initialPage = location.hash ? location.hash.substring(1) : "home";
    navigate(initialPage, false);
    const form = document.getElementById("customerForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const message = document.getElementById("message").value;
            const rating = document.getElementById("rating").value;
            const recommend = form.elements["recommend"].value;
            if (message.trim() === "") {
                alert("Please enter a message.");
                return;
            }
            alert(`Thank you for your feedback!\nMessage: ${message}\nRating: ${rating}\nRecommend: ${recommend}`);
            form.reset();
        });
    }
});

function showCustomerForm() {
    navigate("customer-form");
}

document.addEventListener("DOMContentLoaded", () => {
    loadCarImages("used-cars-gallery", "used", 9);
    loadCarImages("new-cars-gallery", "new", 9);
});

function loadCarImages(containerId, imagePrefix, count) {
    const container = document.getElementById(containerId);
    for (let i = 1; i <= count; i++) {
        const img = document.createElement("img");
        img.src = `pictures/${imagePrefix}${i}.jpg`;
        img.alt = `${imagePrefix.charAt(0).toUpperCase() + imagePrefix.slice(1)} Car ${i}`;
        img.classList.add("car-image");
        container.appendChild(img);
    }
}

function openModal(carId, imageSrc) {
    const modal = document.getElementById("carModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const moreInfoLink = document.getElementById("moreInfoLink");
    const reviewLink = document.getElementById("reviewLink");
    const likeButton = document.getElementById("likeButton");
    if (productData[carId]) {
        modalImage.src = imageSrc;
        modalTitle.textContent = productData[carId].title;
        modalDescription.textContent = productData[carId].description;
        moreInfoLink.href = productData[carId].moreInfo;
        reviewLink.href = productData[carId].review;
        modal.style.display = "block";
        if (!likeCounts[carId]) likeCounts[carId] = 0;
        if (likesStatus[carId] === undefined) likesStatus[carId] = false;
        likeButton.textContent = likesStatus[carId] ? "Unlike 💔" : "Like ❤️";
        document.getElementById("likeCount").textContent = likeCounts[carId];
        if (!commentsData[carId]) commentsData[carId] = [];
        displayComments(carId);
    } else {
        console.error("No data found for carId:", carId);
    }
}

function closeModal() {
    const modal = document.getElementById("carModal");
    modal.style.display = "none";
    document.getElementById("modalImage").src = "";
    document.getElementById("modalTitle").textContent = "";
    document.getElementById("modalDescription").textContent = "";
    document.getElementById("moreInfoLink").href = "#";
    document.getElementById("reviewLink").href = "#";
}

function toggleLike() {
    const carId = document.getElementById("modalImage").src.split('/').pop().split('.')[0];
    if (carId) {
        if (!likeCounts[carId]) likeCounts[carId] = 0;
        if (likesStatus[carId] === undefined) likesStatus[carId] = false;
        likesStatus[carId] = !likesStatus[carId];
        likeCounts[carId] += likesStatus[carId] ? 1 : -1;
        document.getElementById("likeCount").textContent = likeCounts[carId];
        document.getElementById("likeButton").textContent = likesStatus[carId] ? "Unlike 💔" : "Like ❤️";
    }
}

function displayComments(carId) {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = "";
    commentsData[carId].forEach((comment, index) => {
        const commentItem = document.createElement("li");
        commentItem.classList.add("comment-item");
        commentItem.textContent = `${comment.username}: ${comment.text}`;
        if (comment.username === currentUsername) {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.onclick = () => deleteComment(carId, index);
            commentItem.appendChild(deleteButton);
        }
        commentsList.appendChild(commentItem);
    });
}

function addComment() {
    const carId = document.getElementById("modalImage").src.split('/').pop().split('.')[0];
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value.trim();
    if (commentText && currentUsername) {
        const comment = { username: currentUsername, text: commentText };
        commentsData[carId] = commentsData[carId] || [];
        commentsData[carId].push(comment);
        commentInput.value = "";
        displayComments(carId);
    } else {
        alert("Please log in and enter a comment before posting.");
    }
}

function deleteComment(carId, commentIndex) {
    commentsData[carId].splice(commentIndex, 1);
    displayComments(carId);
}

window.onclick = function (event) {
    const modal = document.getElementById("carModal");
    if (event.target == modal) {
        closeModal();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const carImages = document.querySelectorAll(".car-image");
    carImages.forEach((img) => {
        const carId = img.src.split('/').pop().split('.')[0];
        img.addEventListener("click", () => openModal(carId, img.src));
    });
    document.getElementById("likeButton").addEventListener("click", toggleLike);
    document.getElementById("testDriveForm").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Test drive request submitted!");
        closeModal();
    });
});


const productData = {
    used1: {
        title: "Kia Sportage 2011",
        description: "This is a reliable used Kia Sportage from 2011, known for its durability.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Sportage",
        review: "https://www.edmunds.com/kia/sportage/2011/review/"
    },
    used2: {
        title: "Kia Carens 2008",
        description: "A spacious and affordable family car from 2008, offering good mileage.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Carens",
        review: "https://www.rac.co.uk/drive/car-reviews/kia/carens/carens-2006-2010/"
    },
    used3: {
        title: "Kia Picanto 2015",
        description: "A compact city car with excellent fuel efficiency and easy handling.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Picanto",
        review: "https://www.rac.co.uk/drive/car-reviews/kia/picanto/picanto-2011-2017/"
    },
    used4: {
        title: "Kia Sportage 2012",
        description: "An upgraded version of the Sportage series, known for its powerful performance.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Sportage",
        review: "https://www.edmunds.com/kia/sportage/2012/review/"
    },
    used5: {
        title: "Kia Pro Ceed 2013",
        description: "A stylish and sporty compact hatchback with impressive features.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Ceed",
        review: "https://www.autoexpress.co.uk/kia/proceed"
    },
    used6: {
        title: "Kia Sportage 2015",
        description: "A modern SUV offering robust performance and family-friendly space.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Sportage",
        review: "https://www.edmunds.com/kia/sportage/2015/review/"
    },
    used7: {
        title: "Kia Ceed 2008",
        description: "An affordable and practical family car, ideal for city and long drives.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Ceed",
        review: "https://www.rac.co.uk/drive/car-reviews/kia/cee-d/cee'd-2007-2009/"
    },
    used8: {
        title: "Kia Sorento 2008",
        description: "A reliable SUV with ample space, suitable for off-road adventures.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Sorento",
        review: "https://www.edmunds.com/kia/sorento/2008/review/"
    },
    used9: {
        title: "Kia Sephia 1995",
        description: "A classic Kia model, known for its simplicity and reliability.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Sephia",
        review: "https://www.edmunds.com/kia/sephia/1995/review/"
    },
    new1: {
        title: "Kia K5 2025",
        description: "The all-new Kia K5 sedan with advanced tech and sleek design.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_K5",
        review: "https://www.edmunds.com/kia/k5/"
    },
    new2: {
        title: "Kia EV9 2024",
        description: "A fully electric SUV that combines sustainability with modern features.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_EV9",
        review: "https://www.edmunds.com/kia/ev9/"
    },
    new3: {
        title: "Kia EV6 2024",
        description: "A cutting-edge electric vehicle designed for efficiency and style.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_EV6",
        review: "https://www.edmunds.com/kia/ev6/"
    },
    new4: {
        title: "Kia Niro EV 2024",
        description: "A compact electric crossover that offers an eco-friendly driving experience.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Niro",
        review: "https://www.edmunds.com/kia/niro-ev/"
    },
    new5: {
        title: "Kia Sportage 2025",
        description: "The latest Sportage model with enhanced features and performance.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Sportage",
        review: "https://www.edmunds.com/kia/sportage/"
    },
    new6: {
        title: "Kia Carnival MPV 2025",
        description: "A modern multi-purpose vehicle with ample space for families.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Carnival",
        review: "https://www.edmunds.com/kia/carnival/"
    },
    new7: {
        title: "Kia Telluride 2025",
        description: "A robust SUV with advanced safety features and luxurious comfort.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Telluride",
        review: "https://www.edmunds.com/kia/telluride/"
    },
    new8: {
        title: "Kia Sorento 2025",
        description: "A versatile SUV designed for both city and off-road driving.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Sorento",
        review: "https://www.edmunds.com/kia/sorento/"
    },
    new9: {
        title: "Kia Soul 2025",
        description: "A compact SUV with a unique design and advanced tech features.",
        moreInfo: "https://en.wikipedia.org/wiki/Kia_Soul",
        review: "https://www.edmunds.com/kia/soul/"
    }
};
