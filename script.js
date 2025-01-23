document.addEventListener('DOMContentLoaded', () => {
    // Display course details
    const courseDetails = {
        title: "Mastering Web Development: Beginner to Advanced",
        level: "Beginner",
        duration: "20 hours",
        videos: 25,
        rating: "4.5/5",
    };

    const displayCourseDetails = () => {
        document.querySelector('.course-title').textContent = courseDetails.title;
        const courseInfoItems = document.querySelectorAll('.course-info p span');
        courseInfoItems[0].textContent = courseDetails.level;
        courseInfoItems[1].textContent = courseDetails.duration;
        courseInfoItems[2].textContent = courseDetails.videos;
        courseInfoItems[3].textContent = courseDetails.rating;
    };

    displayCourseDetails();

    // Handle "Mark as Completed" checkboxes
    document.querySelectorAll('.mark-completed').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const videoItem = checkbox.closest('.video-item');
            if (checkbox.checked) {
                videoItem.style.textDecoration = 'line-through';
            } else {
                videoItem.style.textDecoration = 'none';
            }
            updateProgress();
        });
    });

    // Save Notes Button
    const saveNotesButton = document.querySelector('.save-notes-button');
    if (saveNotesButton) {
        saveNotesButton.addEventListener('click', () => {
            const notes = document.querySelector('textarea').value;
            if (notes) {
                alert('Notes saved successfully!');
                localStorage.setItem('userNotes', notes);
            } else {
                alert('Please write some notes before saving.');
            }
        });
    }

    // Load saved notes
    const loadNotes = () => {
        const savedNotes = localStorage.getItem('userNotes');
        if (savedNotes) {
            document.querySelector('textarea').value = savedNotes;
        }
    };

    loadNotes();

    // AI-Generated Summaries
    const aiSummaries = {
        "Introduction to HTML": "This video covers the basics of HTML, including tags, structure, and semantic elements.",
        "CSS Basics": "Learn the fundamentals of CSS, including selectors, properties, and responsive design techniques."
    };

    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach(video => {
        video.addEventListener('click', () => {
            const title = video.querySelector('.video-title').textContent;
            const summary = aiSummaries[title] || "Summary not available.";
            const summaryContainer = document.querySelector('.video-summary p');
            summaryContainer.textContent = summary;
        });
    });

    // Update Progress Tracker
    function updateProgress() {
        const totalVideos = document.querySelectorAll('.video-item').length;
        const completedVideos = document.querySelectorAll('.mark-completed:checked').length;
        const progressPercentage = Math.round((completedVideos / totalVideos) * 100);

        const progressBar = document.querySelector('.progress');
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${progressPercentage}% Complete`;

        if (progressPercentage === 100) {
            document.querySelector('.download-certificate-button').disabled = false;
        }
    }

    // Initialize Progress on Page Load
    updateProgress();

    // Video Player Error Handling
    const videoFrame = document.querySelector('#video-frame');
    videoFrame.addEventListener('error', () => {
        videoFrame.src = '';
        const summaryContainer = document.querySelector('.video-summary p');
        summaryContainer.textContent = "Error loading video. Please check the link.";
    });

    // Post Comment Button
    const postCommentButton = document.querySelector('.post-comment-button');
    postCommentButton.addEventListener('click', () => {
        const comment = document.querySelector('.community-engagement textarea').value;
        if (comment) {
            alert('Your comment has been posted!');
            document.querySelector('.community-engagement textarea').value = '';
        } else {
            alert('Please write a comment before posting.');
        }
    });

    // Submit Rating Button
    const submitRatingButton = document.querySelector('.submit-rating-button');
    submitRatingButton.addEventListener('click', () => {
        const rating = document.getElementById('course-rating').value;
        alert(`Thank you for rating the course: ${rating} stars!`);
    });

    // Enable Certificate Download
    const downloadCertificateButton = document.querySelector('.download-certificate-button');
    downloadCertificateButton.disabled = true; // Disabled initially
    downloadCertificateButton.addEventListener('click', () => {
        alert('Congratulations on completing the course! Your certificate will be downloaded.');
    });
});
