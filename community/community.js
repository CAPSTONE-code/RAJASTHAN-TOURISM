


function create_topic_card(data) {
    const topic_card = document.createElement('div');
    topic_card.className = 'topic-card'

    const top = document.createElement('div');
    top.className = 'top';
    const curTime = current_time(data.time);

    top.innerHTML = `<p class="username">${data.username}</p>
                    <p class="time">•${Math.round(curTime[0])} ${curTime[1]}</p>`
    topic_card.appendChild(top)

    const tptitle = document.createElement('h3');
    tptitle.className = 'tp-title';
    tptitle.innerHTML = `${data.title}`;
    topic_card.appendChild(tptitle);

    const taglist = document.createElement('ul');
    taglist.className = 'taglist';
    data.tags.forEach(tag => {
        const tagEl = document.createElement('p');
        tagEl.textContent = `# ${tag}`;
        taglist.appendChild(tagEl);
    });

    topic_card.appendChild(taglist)

    const description = document.createElement('p');
    description.className = 'description';
    description.innerText = data.description;

    topic_card.appendChild(description);

    const props = document.createElement('div');
    props.className = 'props';
    props.innerHTML = `<button id="likes"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>${data.likes}</button>
                    <button id="comments"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                            <path
                                d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                        </svg>${data.comments}</button>
                    <button id="share"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                            <path
                                d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                        </svg></button>`

    topic_card.appendChild(props)
    return topic_card;

}

//calculate post time posted
function current_time(date) {
    let now = new Date();
    const date1 = new Date(date); 

    const date2 = new Date('2025-06-05T15:30:00'); 
    const timeDifferenceMs = now - date1;

    const timeDifferenceSeconds = timeDifferenceMs / 1000;
    const timeDifferenceMinutes = timeDifferenceSeconds / 60;
    const timeDifferenceHours = timeDifferenceMinutes / 60;
    const timeDiffrenceDays = timeDifferenceHours / 24
    const timeDiffrenceWeeks = timeDiffrenceDays / 7
    const timeDiffrenceMonths = timeDiffrenceDays / 30
    const timeDiffrenceYears = timeDiffrenceMonths / 12

    let timeobj = [
        [timeDifferenceSeconds, "seconds ago"],
        [timeDifferenceMinutes, "minutes ago"],
        [timeDifferenceHours, "Hours ago"],
        [timeDiffrenceDays, "days ago"],
        [timeDiffrenceWeeks, "weeks ago"],
        [timeDiffrenceMonths, "months ago"],
        [timeDiffrenceYears, "years ago"]
    ]
    

    for (let i = timeobj.length - 1; i >= 0; i--) {
        if (timeobj[i][0] >= 1) {
            return (timeobj[i])
        }
    }

}

// loads posts from database
async function load_posts() {
    const response = await fetch(`https://capstone1-backend-siddhantv369-siddhantv369s-projects.vercel.app/api/community`);
    const posts = await response.json();
    let container = document.querySelector('.content');
    for (dat of posts) {
        container.append(create_topic_card(dat))
    }
}


const dialog = document.querySelector('.create-post');
const form = dialog.querySelector('.submittion');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default dialog close behavior
    const current_time=new Date()
    const data = {
        username: form.querySelector('.name').value.trim(),
        time: (current_time.toISOString()).slice(0,19),
        title: form.querySelector('.post-title').value.trim(),
        tags: form.querySelector('.post-tags').value.trim().split(' ').map(tag => tag.trim()),
        description: form.querySelector('.post-description').value.trim(),
        likes:0,
        comments:0
    };
    document.querySelector('.content').insertBefore(create_topic_card(data),document.querySelector('.topic-card'))
});


function main() {
    const dialog = document.querySelector('.create-post');
    const showbutton = document.querySelector('#new');
    const wrapper = document.querySelector('.wrapper');
    const submitBtn = document.querySelector('.sub');
    const closeButton = document.querySelector('.close-dialog');


    // Show dialog when + button is clicked
    showbutton.addEventListener('click', () => {
        dialog.showModal();
        // Add animation class
        dialog.classList.add('dialog-open');
    });
    
    // Close dialog when clicking outside
    dialog.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target) && e.target !== closeButton) {
            dialog.close();
        }
        if(e.target.className='sub'){
            dialog.close()
        }
    });
    
    // Close dialog when close button is clicked
    closeButton.addEventListener('click', () => {
        dialog.close();
    })

    likebutton = document.querySelectorAll('#likes')
    for (btn of likebutton) {
        btn.addEventListener('click', () => {
            Like_comment()
        })
    }
}



function Like_comment() {
    like = document.querySelector('#likes');
    like.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>${data.likes + 1}`;
}

function create_post() {
    let newPost = document.querySelector('.wrapper');
}

main()
load_posts()



