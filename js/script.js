/* =========================================================
   NCU HUB - MAIN JAVASCRIPT
   Complete version
   English / Chinese
   Student + Teacher Dashboard
   ========================================================= */


/* =========================================================
   PAGE START
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const savedLanguage =
        localStorage.getItem("language") || "en";

    applyLanguage(savedLanguage);

    loadVotes();
    loadProjectVotes();
    loadSubmittedProjects();
    loadQuestions();
    loadStudentDashboard();
    loadTeacherProjects();

});


/* =========================================================
   LANGUAGE SYSTEM
   ========================================================= */

function applyLanguage(language) {

    if (language !== "en" && language !== "zh") {
        language = "en";
    }

    localStorage.setItem("language", language);

    /* Normal text */

    const elements =
        document.querySelectorAll("[data-en]");

    elements.forEach(function (element) {

        const english =
            element.getAttribute("data-en");

        const chinese =
            element.getAttribute("data-zh");

        if (language === "zh") {

            if (chinese !== null) {
                element.textContent = chinese;
            }

        } else {

            if (english !== null) {
                element.textContent = english;
            }

        }

    });


    /* Placeholders */

    const placeholderElements =
        document.querySelectorAll(
            "[data-en-placeholder]"
        );

    placeholderElements.forEach(function (element) {

        const english =
            element.getAttribute(
                "data-en-placeholder"
            );

        const chinese =
            element.getAttribute(
                "data-zh-placeholder"
            );

        if (language === "zh") {

            if (chinese) {
                element.placeholder = chinese;
            }

        } else {

            if (english) {
                element.placeholder = english;
            }

        }

    });


    /* HTML language */

    document.documentElement.lang =
        language === "zh" ? "zh" : "en";


    updateLanguageButtons(language);
    updateTranslatedOptions(language);


    /*
       Dynamic content must also be rebuilt
       after changing language.
    */

    loadSubmittedProjects();
    loadQuestions();
    loadStudentDashboard();
    loadTeacherProjects();

}


/* =========================================================
   LANGUAGE BUTTON
   ========================================================= */

function updateLanguageButtons(language) {

    const buttons =
        document.querySelectorAll(
            ".language-btn, #languageButton"
        );

    buttons.forEach(function (button) {

        const text =
            button.querySelector(
                "[data-en], [data-zh]"
            );

        if (!text) {
            return;
        }

        if (language === "zh") {

            text.textContent = "English";

        } else {

            text.textContent = "中文";

        }

    });


    const selector =
        document.getElementById(
            "languageSelector"
        );

    if (selector) {
        selector.value = language;
    }

}


/* =========================================================
   TRANSLATE SELECT OPTIONS
   ========================================================= */

function updateTranslatedOptions(language) {

    const options =
        document.querySelectorAll(
            "option[data-en]"
        );

    options.forEach(function (option) {

        if (language === "zh") {

            option.textContent =
                option.getAttribute("data-zh");

        } else {

            option.textContent =
                option.getAttribute("data-en");

        }

    });

}


/* =========================================================
   CHANGE LANGUAGE
   ========================================================= */

function changeLanguage(language) {

    if (!language) {

        const current =
            localStorage.getItem(
                "language"
            ) || "en";

        language =
            current === "en"
                ? "zh"
                : "en";
    }

    applyLanguage(language);

}


/* =========================================================
   LOGIN / ACCESS
   ========================================================= */

function checkAccess(requiredRole) {

    const loggedIn =
        localStorage.getItem("loggedIn");

    const userRole =
        localStorage.getItem("userRole");


    if (loggedIn !== "true") {

        const language =
            localStorage.getItem("language") || "en";

        if (language === "zh") {

            alert("请先登录");

        } else {

            alert("Please login first");

        }

        window.location.href =
            "login.html";

        return false;
    }


    if (userRole !== requiredRole) {

        const language =
            localStorage.getItem("language") || "en";


        if (language === "zh") {

            alert(
                "您没有权限访问此页面"
            );

        } else {

            alert(
                "You do not have permission to access this page"
            );

        }


        if (userRole === "student") {

            window.location.href =
                "students.html";

        } else if (userRole === "teacher") {

            window.location.href =
                "teachers.html";

        } else {

            window.location.href =
                "login.html";
        }

        return false;
    }


    return true;
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    window.location.href =
        "login.html";
}


/* =========================================================
   MAIN PAGE VOTES
   ========================================================= */

function loadVotes() {

    const aiVotes =
        localStorage.getItem("aiVotes") || 23;

    const campusVotes =
        localStorage.getItem("campusVotes") || 18;


    const aiElement =
        document.getElementById("aiVotes");

    const campusElement =
        document.getElementById("campusVotes");

    const topAi =
        document.getElementById("topAiVotes");

    const topCampus =
        document.getElementById("topCampusVotes");


    if (aiElement) {
        aiElement.textContent = aiVotes;
    }

    if (campusElement) {
        campusElement.textContent = campusVotes;
    }

    if (topAi) {
        topAi.textContent = aiVotes;
    }

    if (topCampus) {
        topCampus.textContent = campusVotes;
    }

}


/* =========================================================
   VOTE AI
   ========================================================= */

function voteAI() {

    let votes =
        parseInt(
            localStorage.getItem("aiVotes")
        ) || 23;

    votes++;

    localStorage.setItem(
        "aiVotes",
        votes
    );

    loadVotes();

}


/* =========================================================
   VOTE CAMPUS
   ========================================================= */

function voteCampus() {

    let votes =
        parseInt(
            localStorage.getItem("campusVotes")
        ) || 18;

    votes++;

    localStorage.setItem(
        "campusVotes",
        votes
    );

    loadVotes();

}


/* =========================================================
   OLD VOTE FUNCTION
   ========================================================= */

function vote() {

    voteAI();

}


/* =========================================================
   PROJECT PAGE VOTES
   ========================================================= */

function loadProjectVotes() {

    const projects = [

        {
            storage: "securityProjectVotes",
            element: "securityVotes",
            defaultVotes: 12
        },

        {
            storage: "dataProjectVotes",
            element: "dataVotes",
            defaultVotes: 9
        },

        {
            storage: "studyProjectVotes",
            element: "studyVotes",
            defaultVotes: 7
        },

        {
            storage: "eventsProjectVotes",
            element: "eventsVotes",
            defaultVotes: 5
        }

    ];


    projects.forEach(function (project) {

        const element =
            document.getElementById(
                project.element
            );

        if (!element) {
            return;
        }

        const votes =
            localStorage.getItem(
                project.storage
            ) || project.defaultVotes;

        element.textContent =
            votes;

    });

}


/* =========================================================
   INDIVIDUAL PROJECT VOTES
   ========================================================= */

function voteSecurityProject() {

    let votes =
        parseInt(
            localStorage.getItem(
                "securityProjectVotes"
            )
        ) || 12;

    votes++;

    localStorage.setItem(
        "securityProjectVotes",
        votes
    );

    loadProjectVotes();

}


function voteDataProject() {

    let votes =
        parseInt(
            localStorage.getItem(
                "dataProjectVotes"
            )
        ) || 9;

    votes++;

    localStorage.setItem(
        "dataProjectVotes",
        votes
    );

    loadProjectVotes();

}


function voteStudyProject() {

    let votes =
        parseInt(
            localStorage.getItem(
                "studyProjectVotes"
            )
        ) || 7;

    votes++;

    localStorage.setItem(
        "studyProjectVotes",
        votes
    );

    loadProjectVotes();

}


function voteEventsProject() {

    let votes =
        parseInt(
            localStorage.getItem(
                "eventsProjectVotes"
            )
        ) || 5;

    votes++;

    localStorage.setItem(
        "eventsProjectVotes",
        votes
    );

    loadProjectVotes();

}


/* =========================================================
   SUBMIT PROJECT
   ========================================================= */

function submitProject() {

    const nameElement =
        document.getElementById("projectName");

    const categoryElement =
        document.getElementById("projectCategory");

    const descriptionElement =
        document.getElementById(
            "projectDescription"
        );

    const message =
        document.getElementById(
            "projectMessage"
        );


    if (
        !nameElement ||
        !categoryElement ||
        !descriptionElement
    ) {
        return;
    }


    const name =
        nameElement.value.trim();

    const category =
        categoryElement.value;

    const description =
        descriptionElement.value.trim();


    if (
        name === "" ||
        category === "" ||
        description === ""
    ) {

        if (message) {

            message.textContent =
                getText(
                    "Please complete all fields.",
                    "请填写所有字段。"
                );

            message.style.color =
                "#dc3545";
        }

        return;
    }


    const projects =
        JSON.parse(
            localStorage.getItem(
                "ncuProjects"
            )
        ) || [];


    const newProject = {

        id: Date.now(),

        name: name,

        category: category,

        description: description,

        author:
            localStorage.getItem(
                "userEmail"
            ) || "NCU Student",

        votes: 0,

        status: "Pending",

        createdAt:
            new Date().toISOString()

    };


    projects.push(newProject);


    localStorage.setItem(
        "ncuProjects",
        JSON.stringify(projects)
    );


    if (message) {

        message.textContent =
            getText(
                "Project submitted successfully!",
                "项目提交成功！"
            );

        message.style.color =
            "#198754";

    }


    nameElement.value = "";
    categoryElement.value = "";
    descriptionElement.value = "";


    loadSubmittedProjects();
    loadStudentDashboard();
    loadTeacherProjects();

}


/* =========================================================
   LOAD SUBMITTED PROJECTS
   ========================================================= */

function loadSubmittedProjects() {

    const container =
        document.getElementById(
            "submittedProjects"
        );

    if (!container) {
        return;
    }


    const projects =
        JSON.parse(
            localStorage.getItem(
                "ncuProjects"
            )
        ) || [];


    container.innerHTML = "";


    if (projects.length === 0) {

        container.innerHTML = `

            <div class="text-center py-5">

                <i class="bi bi-folder2-open fs-1 text-muted"></i>

                <p class="text-muted mt-3">

                    ${getText(
                        "No submitted projects yet.",
                        "还没有提交的项目。"
                    )}

                </p>

            </div>

        `;

        return;
    }


    projects.forEach(function (project) {

        const card =
            document.createElement("div");

        card.className =
            "project-card-wrapper";

        card.setAttribute(
            "data-category",
            project.category
        );


        card.innerHTML = `

            <div class="card h-100 border-0 shadow-sm">

                <div class="card-body">

                    <span class="badge bg-primary mb-3">
                        ${escapeHTML(project.category)}
                    </span>

                    <h5 class="fw-bold">
                        ${escapeHTML(project.name)}
                    </h5>

                    <p class="text-muted">
                        ${escapeHTML(project.description)}
                    </p>

                    <small class="text-muted">

                        ${getText(
                            "By",
                            "作者"
                        )}

                        ${escapeHTML(project.author)}

                    </small>

                    <div class="mt-3">

                        <button
                            class="btn btn-outline-primary btn-sm"
                            onclick="voteSubmittedProject(${project.id})"
                        >

                            <i class="bi bi-hand-thumbs-up"></i>

                            ${getText(
                                "Vote",
                                "投票"
                            )}

                            <span>
                                ${project.votes || 0}
                            </span>

                        </button>

                    </div>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   VOTE SUBMITTED PROJECT
   ========================================================= */

function voteSubmittedProject(projectId) {

    const projects =
        JSON.parse(
            localStorage.getItem(
                "ncuProjects"
            )
        ) || [];


    const project =
        projects.find(
            p => Number(p.id) === Number(projectId)
        );


    if (!project) {
        return;
    }


    project.votes =
        (project.votes || 0) + 1;


    localStorage.setItem(
        "ncuProjects",
        JSON.stringify(projects)
    );


    loadSubmittedProjects();
    loadStudentDashboard();
    loadTeacherProjects();

}


/* =========================================================
   STUDENT DASHBOARD
   ========================================================= */

function loadStudentDashboard() {

    const container =
        document.getElementById(
            "studentProjects"
        );

    /*
       If we are not on students.html,
       stop here.
    */

    if (!container) {
        return;
    }


    const email =
        localStorage.getItem(
            "userEmail"
        );


    const projects =
        JSON.parse(
            localStorage.getItem(
                "ncuProjects"
            )
        ) || [];


    /*
       Find projects created by
       the currently logged-in student.
    */

    const myProjects =
        projects.filter(function (project) {

            return project.author === email;

        });


    /* =====================================================
       OVERVIEW 1 — PROJECT COUNT
       ===================================================== */

    const count =
        document.getElementById(
            "myProjectCount"
        );


    if (count) {

        count.textContent =
            myProjects.length;

    }


    /* =====================================================
       OVERVIEW 2 — TOTAL VOTES
       ===================================================== */

    const totalVotes =
        myProjects.reduce(
            function (total, project) {

                return total +
                    Number(project.votes || 0);

            },
            0
        );


    const votesElement =
        document.getElementById(
            "myTotalVotes"
        );


    if (votesElement) {

        votesElement.textContent =
            totalVotes;

    }


    /* =====================================================
       OVERVIEW 3 — COLLABORATORS
       ===================================================== */

    const collaborationRequests =
        JSON.parse(
            localStorage.getItem(
                "ncuCollaborationRequests"
            )
        ) || [];


    const myProjectIds =
        myProjects.map(function (project) {

            return Number(project.id);

        });


    const collaboratorRequests =
        collaborationRequests.filter(
            function (request) {

                return myProjectIds.includes(
                    Number(request.projectId)
                );

            }
        );


    const collaboratorsElement =
        document.getElementById(
            "myCollaborators"
        );


    if (collaboratorsElement) {

        /*
           Count unique students.
        */

        const uniqueStudents =
            new Set(
                collaboratorRequests.map(
                    function (request) {

                        return request.student;

                    }
                )
            );


        collaboratorsElement.textContent =
            uniqueStudents.size;

    }


    /* =====================================================
       OVERVIEW 4 — TEACHER FEEDBACK
       ===================================================== */

    const feedback =
        JSON.parse(
            localStorage.getItem(
                "ncuFeedback"
            )
        ) || [];


    const feedbackProjectIds =
        new Set(
            myProjects.map(function (project) {

                return Number(project.id);

            })
        );


    const myFeedback =
        feedback.filter(
            function (item) {

                return feedbackProjectIds.has(
                    Number(item.projectId)
                );

            }
        );


    const feedbackCount =
        document.getElementById(
            "myFeedbackCount"
        );


    if (feedbackCount) {

        feedbackCount.textContent =
            myFeedback.length;

    }


    /* =====================================================
       PROJECT TABLE
       ===================================================== */

    container.innerHTML = "";


    if (myProjects.length === 0) {

        container.innerHTML = `

            <div class="empty-project">

                <div class="empty-project-icon">

                    <i class="bi bi-folder2-open"></i>

                </div>

                <h3>

                    ${getText(
                        "No projects yet",
                        "还没有项目"
                    )}

                </h3>

                <p>

                    ${getText(
                        "Create your first project and share your work with the NCU community.",
                        "创建你的第一个项目，与南昌大学社区分享你的作品。"
                    )}

                </p>

                <button
                    class="primary-btn"
                    onclick="document.getElementById('submitProjectSection').scrollIntoView({behavior:'smooth'})"
                >

                    <i class="bi bi-plus-lg"></i>

                    ${getText(
                        "Create your first project",
                        "创建第一个项目"
                    )}

                </button>

            </div>

        `;

        loadStudentFeedback();

        return;
    }


    /*
       Newest projects first.
    */

    const sortedProjects =
        [...myProjects].reverse();


    sortedProjects.forEach(
        function (project) {

            const status =
                project.status || "Pending";


            const isReview =
                status.toLowerCase() === "pending";


            const statusClass =
                isReview
                    ? "project-status status-review"
                    : "project-status";


            const statusText =
                isReview
                    ? getText(
                        "Pending review",
                        "等待审核"
                    )
                    : getText(
                        "Approved",
                        "已通过"
                    );


            const row =
                document.createElement("div");


            row.className =
                "project-row";


            row.innerHTML = `

                <div>

                    <div class="project-title">

                        ${escapeHTML(project.name)}

                    </div>

                    <div class="project-description">

                        ${escapeHTML(
                            project.description
                        )}

                    </div>

                </div>


                <div>

                    <span class="project-category">

                        ${escapeHTML(
                            project.category
                        )}

                    </span>

                </div>


                <div class="project-votes">

                    <i class="bi bi-hand-thumbs-up"></i>

                    ${project.votes || 0}

                </div>


                <div class="${statusClass}">

                    <span class="status-dot"></span>

                    ${statusText}

                </div>

            `;


            container.appendChild(row);

        }
    );


    /*
       Load feedback after the project list.
    */

    loadStudentFeedback();

}


/* =========================================================
   STUDENT FEEDBACK
   ========================================================= */

function loadStudentFeedback() {

    const container =
        document.getElementById(
            "feedback"
        );


    if (!container) {
        return;
    }


    const email =
        localStorage.getItem(
            "userEmail"
        );


    const projects =
        JSON.parse(
            localStorage.getItem(
                "ncuProjects"
            )
        ) || [];


    const feedback =
        JSON.parse(
            localStorage.getItem(
                "ncuFeedback"
            )
        ) || [];


    const myProjectIds =
        projects
            .filter(function (project) {

                return project.author === email;

            })
            .map(function (project) {

                return Number(project.id);

            });


    const myFeedback =
        feedback.filter(
            function (item) {

                return myProjectIds.includes(
                    Number(item.projectId)
                );

            }
        );


    if (myFeedback.length === 0) {

        container.innerHTML = `

            <div class="feedback-empty">

                <i class="bi bi-chat-square-text fs-4"></i>

                <div class="mt-2">

                    ${getText(
                        "No feedback yet",
                        "暂无反馈"
                    )}

                </div>

            </div>

        `;

        return;
    }


    container.innerHTML = "";


    /*
       Newest feedback first.
    */

    const sortedFeedback =
        [...myFeedback].reverse();


    sortedFeedback.forEach(
        function (item) {

            const project =
                projects.find(
                    function (p) {

                        return Number(p.id) ===
                            Number(item.projectId);

                    }
                );


            const feedbackItem =
                document.createElement("div");


            feedbackItem.className =
                "feedback-item";


            feedbackItem.innerHTML = `

                <div class="feedback-project">

                    ${escapeHTML(
                        project
                            ? project.name
                            : getText(
                                "Project",
                                "项目"
                            )
                    )}

                </div>


                <div class="feedback-author">

                    ${getText(
                        "Teacher:",
                        "教师："
                    )}

                    ${escapeHTML(
                        item.teacher
                    )}

                </div>


                <div class="feedback-text">

                    ${escapeHTML(
                        item.message
                    )}

                </div>

            `;


            container.appendChild(
                feedbackItem
            );

        }
    );

}


/* =========================================================
   TEACHER DASHBOARD
   ========================================================= */

function loadTeacherProjects() {

    const container =
        document.getElementById(
            "teacherProjects"
        );


    if (!container) {
        return;
    }


    const projects =
        JSON.parse(
            localStorage.getItem(
                "ncuProjects"
            )
        ) || [];


    const count =
        document.getElementById(
            "teacherProjectCount"
        );


    const total =
        document.getElementById(
            "teacherTotalProjects"
        );


    if (count) {
        count.textContent =
            projects.length;
    }


    if (total) {
        total.textContent =
            projects.length;
    }


    container.innerHTML = "";


    if (projects.length === 0) {

        container.innerHTML = `

            <div class="text-center py-5">

                <i class="bi bi-folder2-open fs-1 text-muted"></i>

                <h5 class="mt-3">

                    ${getText(
                        "No student projects yet",
                        "目前还没有学生项目"
                    )}

                </h5>

                <p class="text-muted">

                    ${getText(
                        "New student projects will appear here.",
                        "新的学生项目将显示在这里。"
                    )}

                </p>

            </div>

        `;

        return;
    }


    const sortedProjects =
        [...projects].reverse();


    sortedProjects.forEach(
        function (project) {

            container.innerHTML += `

                <div class="card border-0 shadow-sm rounded-4 mb-3">

                    <div class="card-body">

                        <div class="d-flex justify-content-between">

                            <div>

                                <span class="badge bg-primary mb-2">

                                    ${escapeHTML(
                                        project.category
                                    )}

                                </span>

                                <h5 class="fw-bold">

                                    ${escapeHTML(
                                        project.name
                                    )}

                                </h5>

                                <p class="text-muted">

                                    ${escapeHTML(
                                        project.description
                                    )}

                                </p>

                                <small class="text-muted">

                                    ${getText(
                                        "Student:",
                                        "学生："
                                    )}

                                    ${escapeHTML(
                                        project.author
                                    )}

                                </small>

                            </div>


                            <div class="text-end">

                                <strong>

                                    ${project.votes || 0}

                                </strong>

                                <small class="d-block text-muted">

                                    ${getText(
                                        "Votes",
                                        "票"
                                    )}

                                </small>

                            </div>

                        </div>


                        <div class="mt-3">

                            <button
                                class="btn btn-primary btn-sm me-2"
                                onclick="reviewProject(${project.id})"
                            >

                                <i class="bi bi-eye"></i>

                                ${getText(
                                    "Review",
                                    "查看"
                                )}

                            </button>


                            <button
                                class="btn btn-outline-primary btn-sm"
                                onclick="giveFeedback(${project.id})"
                            >

                                <i class="bi bi-chat-left-text"></i>

                                ${getText(
                                    "Give Feedback",
                                    "提供反馈"
                                )}

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }
    );

}


/* =========================================================
   REVIEW PROJECT
   ========================================================= */

function reviewProject(projectId) {

    const projects =
        JSON.parse(
            localStorage.getItem(
                "ncuProjects"
            )
        ) || [];


    const project =
        projects.find(
            p => Number(p.id) === Number(projectId)
        );


    if (!project) {
        return;
    }


    const language =
        localStorage.getItem(
            "language"
        ) || "en";


    if (language === "zh") {

        alert(

            "项目：" +
            project.name +

            "\n\n" +

            "类别：" +
            project.category +

            "\n\n" +

            "学生：" +
            project.author +

            "\n\n" +

            "描述：\n" +
            project.description

        );

    } else {

        alert(

            "Project: " +
            project.name +

            "\n\n" +

            "Category: " +
            project.category +

            "\n\n" +

            "Student: " +
            project.author +

            "\n\n" +

            "Description:\n" +
            project.description

        );

    }

}


/* =========================================================
   TEACHER FEEDBACK
   ========================================================= */

function giveFeedback(projectId) {

    const projects =
        JSON.parse(
            localStorage.getItem(
                "ncuProjects"
            )
        ) || [];


    const project =
        projects.find(
            p => Number(p.id) === Number(projectId)
        );


    if (!project) {
        return;
    }


    localStorage.setItem(
        "selectedFeedbackProject",
        projectId
    );


    const selected =
        document.getElementById(
            "selectedProject"
        );


    if (selected) {

        selected.textContent =
            getText(
                "Giving feedback for: " +
                project.name,

                "正在为以下项目提供反馈：" +
                project.name
            );

        selected.style.display =
            "block";

    }


    const feedbackText =
        document.getElementById(
            "feedbackText"
        );


    if (feedbackText) {

        feedbackText.focus();

    }


    const feedbackSection =
        document.getElementById(
            "feedback"
        );


    if (feedbackSection) {

        feedbackSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   SUBMIT TEACHER FEEDBACK
   ========================================================= */

function submitTeacherFeedback() {

    const textElement =
        document.getElementById(
            "feedbackText"
        );


    const message =
        document.getElementById(
            "feedbackMessage"
        );


    if (!textElement) {
        return;
    }


    const text =
        textElement.value.trim();


    const projectId =
        parseInt(
            localStorage.getItem(
                "selectedFeedbackProject"
            )
        );


    if (!projectId) {

        if (message) {

            message.textContent =
                getText(
                    "Please select a project first.",
                    "请先选择一个项目。"
                );

            message.style.color =
                "#dc3545";

        }

        return;
    }


    if (text === "") {

        if (message) {

            message.textContent =
                getText(
                    "Please write feedback.",
                    "请输入反馈内容。"
                );

            message.style.color =
                "#dc3545";

        }

        return;
    }


    const feedback =
        JSON.parse(
            localStorage.getItem(
                "ncuFeedback"
            )
        ) || [];


    feedback.push({

        id: Date.now(),

        projectId: projectId,

        teacher:
            localStorage.getItem(
                "userEmail"
            ) || "NCU Teacher",

        message: text,

        date:
            new Date().toISOString()

    });


    localStorage.setItem(
        "ncuFeedback",
        JSON.stringify(feedback)
    );


    if (message) {

        message.textContent =
            getText(
                "Feedback submitted successfully.",
                "反馈提交成功。"
            );

        message.style.color =
            "#198754";

    }


    textElement.value = "";


    localStorage.removeItem(
        "selectedFeedbackProject"
    );


    const selected =
        document.getElementById(
            "selectedProject"
        );


    if (selected) {

        selected.style.display =
            "none";

    }


    /*
       Update student dashboard
       if it is currently open.
    */

    loadStudentDashboard();

}


/* =========================================================
   PROJECT SEARCH
   ========================================================= */

function searchProjects() {

    const input =
        document.getElementById(
            "projectSearch"
        );


    if (!input) {
        return;
    }


    const search =
        input.value.toLowerCase();


    const cards =
        document.querySelectorAll(
            ".project-card-wrapper, .project-item"
        );


    cards.forEach(function (card) {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display =
                "none";

        }

    });

}


/* =========================================================
   PROJECT FILTER
   ========================================================= */

function filterProjects(
    category,
    button
) {

    const cards =
        document.querySelectorAll(
            ".project-card-wrapper, .project-item"
        );


    cards.forEach(function (card) {

        const cardCategory =
            card.getAttribute(
                "data-category"
            );


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "";

        } else {

            card.style.display =
                "none";

        }

    });


    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(function (btn) {

        btn.classList.remove(
            "active"
        );

    });


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


/* =========================================================
   HELP SEARCH
   ========================================================= */

function searchHelp() {

    const input =
        document.getElementById(
            "helpSearch"
        );


    if (!input) {
        return;
    }


    const search =
        input.value.toLowerCase();


    const cards =
        document.querySelectorAll(
            ".question-card"
        );


    cards.forEach(function (card) {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display =
                "none";

        }

    });

}


/* =========================================================
   QUESTIONS
   ========================================================= */

function submitQuestion() {

    const titleElement =
        document.getElementById(
            "questionTitle"
        );

    const categoryElement =
        document.getElementById(
            "questionCategory"
        );

    const descriptionElement =
        document.getElementById(
            "questionDescription"
        );

    const message =
        document.getElementById(
            "questionMessage"
        );


    if (
        !titleElement ||
        !categoryElement ||
        !descriptionElement
    ) {
        return;
    }


    const title =
        titleElement.value.trim();

    const category =
        categoryElement.value;

    const description =
        descriptionElement.value.trim();


    if (
        title === "" ||
        category === "" ||
        description === ""
    ) {

        if (message) {

            message.textContent =
                getText(
                    "Please complete all fields.",
                    "请填写所有字段。"
                );

            message.style.color =
                "#dc3545";

        }

        return;
    }


    const questions =
        JSON.parse(
            localStorage.getItem(
                "ncuQuestions"
            )
        ) || [];


    questions.push({

        id: Date.now(),

        title: title,

        category: category,

        description: description,

        author:
            localStorage.getItem(
                "userEmail"
            ) || "NCU Student",

        answers: 0

    });


    localStorage.setItem(
        "ncuQuestions",
        JSON.stringify(questions)
    );


    if (message) {

        message.textContent =
            getText(
                "Question posted successfully!",
                "问题发布成功！"
            );

        message.style.color =
            "#198754";

    }


    titleElement.value = "";
    categoryElement.value = "";
    descriptionElement.value = "";


    loadQuestions();

}


/* =========================================================
   LOAD QUESTIONS
   ========================================================= */

function loadQuestions() {

    const container =
        document.getElementById(
            "questionsContainer"
        );


    if (!container) {
        return;
    }


    const questions =
        JSON.parse(
            localStorage.getItem(
                "ncuQuestions"
            )
        ) || [];


    container.innerHTML = "";


    questions.forEach(function (question) {

        const card =
            document.createElement("div");


        card.className =
            "question-card user-question";


        card.setAttribute(
            "data-question-id",
            question.id
        );


        card.innerHTML = `

            <div class="card border-0 shadow-sm rounded-4 mb-3">

                <div class="card-body">

                    <span class="badge bg-primary">

                        ${escapeHTML(
                            question.category
                        )}

                    </span>

                    <h5 class="fw-bold mt-2">

                        ${escapeHTML(
                            question.title
                        )}

                    </h5>

                    <p class="text-muted">

                        ${escapeHTML(
                            question.description
                        )}

                    </p>

                    <small class="text-muted">

                        ${getText(
                            "Asked by",
                            "提问者："
                        )}

                        ${escapeHTML(
                            question.author
                        )}

                    </small>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   COLLABORATION
   ========================================================= */

function joinCollaboration(
    projectName,
    projectId
) {

    const requests =
        JSON.parse(
            localStorage.getItem(
                "ncuCollaborationRequests"
            )
        ) || [];


    const student =
        localStorage.getItem(
            "userEmail"
        ) || "NCU Student";


    /*
       Prevent the same student from
       sending the same request twice.
    */

    const alreadyRequested =
        requests.some(function (request) {

            return (
                request.project === projectName &&
                request.student === student
            );

        });


    if (alreadyRequested) {

        const language =
            localStorage.getItem(
                "language"
            ) || "en";


        if (language === "zh") {

            alert(
                "您已经发送过合作请求。"
            );

        } else {

            alert(
                "You have already sent a collaboration request."
            );

        }

        return;
    }


    requests.push({

        id: Date.now(),

        project: projectName,

        projectId:
            projectId || null,

        student: student,

        date:
            new Date().toISOString()

    });


    localStorage.setItem(
        "ncuCollaborationRequests",
        JSON.stringify(requests)
    );


    const language =
        localStorage.getItem(
            "language"
        ) || "en";


    if (language === "zh") {

        alert(
            "您的合作请求已发送！"
        );

    } else {

        alert(
            "Your collaboration request has been sent!"
        );

    }


    loadStudentDashboard();

}


/* =========================================================
   TRANSLATION HELPER
   ========================================================= */

function getText(
    english,
    chinese
) {

    const language =
        localStorage.getItem(
            "language"
        ) || "en";


    if (language === "zh") {

        return chinese;

    }


    return english;

}


/* =========================================================
   HTML SAFETY
   ========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}