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

    // Video data
    const videoData = [
        {
            title: "Introduction to HTML",
            duration: "10:05",
            views: "50,000",
            src: "https://www.youtube.com/embed/G3e-cpL7ofc"
        },
        {
            title: "CSS Basics",
            duration: "15:30",
            views: "40,000",
            src: "https://www.youtube.com/embed/wRNinF7YQqQ"
        }
    ];

    const videoFrame = document.querySelector('#video-frame');
    const summaryContainer = document.querySelector('.video-summary p');
    const videoListContainer = document.querySelector('.video-list');

    // Populate the video list dynamically
    videoListContainer.innerHTML = '';
    videoData.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.dataset.index = index;
        videoItem.innerHTML = `
            <span class="video-title">${video.title}</span>
            <span>Duration: ${video.duration}</span>
            <span>Views: ${video.views}</span>
            <label>
                <input type="checkbox" class="mark-completed"> Mark as Completed
            </label>
        `;
        videoListContainer.appendChild(videoItem);
    });

    // Handle video selection
    videoListContainer.addEventListener('click', (event) => {
        const videoItem = event.target.closest('.video-item');
        if (videoItem) {
            const index = videoItem.dataset.index;
            const selectedVideo = videoData[index];

            // Update the video source and summary
            videoFrame.src = selectedVideo.src;
            summaryContainer.textContent = aiSummaries[selectedVideo.title] || "Summary not available.";

            // Highlight the active video
            document.querySelectorAll('.video-item').forEach(item => item.classList.remove('active-video'));
            videoItem.classList.add('active-video');
        }
    });

    // AI-Generated Summaries
    const aiSummaries = {
        "Introduction to HTML": "This video covers the basics of HTML, including tags, structure, and semantic elements.",
        "CSS Basics": "Learn the fundamentals of CSS, including selectors, properties, and responsive design techniques."
    };

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
    videoFrame.addEventListener('error', () => {
        videoFrame.src = '';
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

    // Initial video setup
    const firstVideo = videoData[0];
    if (firstVideo) {
        videoFrame.src = firstVideo.src;
        summaryContainer.textContent = aiSummaries[firstVideo.title] || "Summary not available.";
    }

    // Ensure checkbox completion logic remains consistent
    document.querySelectorAll('.mark-completed').forEach((checkbox) => {
        checkbox.addEventListener('change', updateProgress);
    });
});