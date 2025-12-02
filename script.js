document.addEventListener("DOMContentLoaded", () => {
    const storyData = [
        {
            image: "images/scene1_fox_sees_grapes.png",
            english: "A Fox one day spied a beautiful bunch of ripe grapes hanging from a vine trained along the branches of a tree. The grapes seemed ready to burst with juice, and the Fox\\'s mouth watered as he gazed longingly at them.",
            chinese: "一天，一只狐狸看到一串熟透了的漂亮葡萄，挂在高高的葡萄藤上。葡萄看起来汁多饱满，狐狸馋得直流口水。",
            audio_en: "audio/scene1_en.mp3",
            audio_zh: "audio/scene1_zh.mp3"
        },
        {
            image: "images/scene2_fox_tries_to_get_grapes.png",
            english: "The bunch hung from a high branch, and the Fox had to jump for it. The first time he jumped he missed it by a long way. So he walked off a short distance and took a running leap at it, only to fall short once more. Again and again he tried, but in vain.",
            chinese: "葡萄挂得很高，狐狸只好跳起来去够。他第一次跳，没够着，差得很远。于是他后退了几步，跑起来用力一跳，还是没够着。他试了一次又一次，都没有成功。",
            audio_en: "audio/scene2_en.mp3",
            audio_zh: "audio/scene2_zh.mp3"
        },
        {
            image: "images/scene3_fox_gives_up.png",
            english: "Now he sat down and looked at the grapes in disgust. \"What a fool I am,\" he said. \"Here I am wearing myself out to get a bunch of sour grapes that are not worth gaping for.\" And off he walked very, very scornfully.",
            chinese: "狐狸坐了下来，生气地看着葡萄。“我真傻，”他说，“我在这儿累得够呛，就为了一串酸葡萄，真不值得。”说完，他非常不屑地走开了。",
            audio_en: "audio/scene3_en.mp3",
            audio_zh: "audio/scene3_zh.mp3"
        }
    ];

    const moral = {
        english: "There are many who pretend to despise and belittle that which is beyond their reach.",
        chinese: "很多人会假装看不起、贬低那些他们得不到的东西。",
        audio_en: "audio/moral_en.mp3",
        audio_zh: "audio/moral_zh.mp3"
    };

    const sourGrapesExamples = [
        { 
            english: "Couldn\\'t win a game, so said, \"This game is boring anyway!\"", 
            chinese: "游戏没赢，所以说：“这个游戏真无聊！”",
            audio_en: "audio/sg_example1_en.mp3",
            audio_zh: "audio/sg_example1_zh.mp3"
        },
        { 
            english: "Didn\\'t get picked for a team, so said, \"I didn\\'t want to play with them anyway!\"", 
            chinese: "没被选进队伍，所以说：“我才不想跟他们玩呢！”",
            audio_en: "audio/sg_example2_en.mp3",
            audio_zh: "audio/sg_example2_zh.mp3"
        },
        { 
            english: "A toy broke, so said, \"I never really liked this toy much.\"", 
            chinese: "玩具坏了，所以说：“我本来就不太喜欢这个玩具。”",
            audio_en: "audio/sg_example3_en.mp3",
            audio_zh: "audio/sg_example3_zh.mp3"
        },
        { 
            english: "Couldn\\'t reach a cookie on a high shelf, so said, \"Those cookies probably taste bad.\"", 
            chinese: "够不到高架子上的饼干，所以说：“那些饼干肯定不好吃。”",
            audio_en: "audio/sg_example4_en.mp3",
            audio_zh: "audio/sg_example4_zh.mp3"
        },
        { 
            english: "Someone else got a bigger ice cream, so said, \"My smaller one is better, too much is unhealthy!\"", 
            chinese: "别人拿了更大的冰淇淋，所以说：“我的小一点更好，太多了不健康！”",
            audio_en: "audio/sg_example5_en.mp3",
            audio_zh: "audio/sg_example5_zh.mp3"
        }
    ];

    let currentSceneIndex = 0;
    let currentLanguage = "english"; // "english" or "chinese"
    let activeAudio = null; 

    const sceneImage = document.getElementById("scene-image");
    const englishParagraph = document.getElementById("english-paragraph");
    const chineseParagraph = document.getElementById("chinese-paragraph");
    const englishTextDiv = document.getElementById("english-text");
    const chineseTextDiv = document.getElementById("chinese-text");
    const englishAudio = document.getElementById("english-audio");
    const chineseAudio = document.getElementById("chinese-audio");

    const prevSceneButton = document.getElementById("prev-scene");
    const nextSceneButton = document.getElementById("next-scene");
    const toggleLanguageButton = document.getElementById("toggle-language");

    const englishMoralP = document.getElementById("english-moral");
    const chineseMoralP = document.getElementById("chinese-moral");
    const englishMoralAudio = document.getElementById("english-moral-audio");
    const chineseMoralAudio = document.getElementById("chinese-moral-audio");

    const mainStoryContent = document.getElementById("main-story-content");
    const sourGrapesMomentPage = document.getElementById("sour-grapes-moment-page");
    const openSourGrapesButton = document.getElementById("open-sour-grapes-moment");
    const closeSourGrapesButton = document.getElementById("close-sour-grapes-moment");
    const sourGrapesExamplesList = document.getElementById("sour-grapes-examples");
    const sgTitleEn = document.getElementById("sour-grapes-title-en");
    const sgTitleZh = document.getElementById("sour-grapes-title-zh");
    const sgExplanationEn = document.getElementById("sour-grapes-explanation-en");
    const sgExplanationZh = document.getElementById("sour-grapes-explanation-zh");

    // SG Explanation Audio Elements
    const sgExplanation1EnAudio = document.getElementById("sg-explanation1-en-audio");
    const sgExplanation2EnAudio = document.getElementById("sg-explanation2-en-audio");
    const sgExplanation1ZhAudio = document.getElementById("sg-explanation1-zh-audio");
    const sgExplanation2ZhAudio = document.getElementById("sg-explanation2-zh-audio");

    function getAllAudioElements() {
        return [
            englishAudio, chineseAudio, englishMoralAudio, chineseMoralAudio,
            sgExplanation1EnAudio, sgExplanation2EnAudio, sgExplanation1ZhAudio, sgExplanation2ZhAudio,
            ...Array.from(sourGrapesExamplesList.querySelectorAll("audio"))
        ];
    }

    function stopAllAudio() {
        getAllAudioElements().forEach(audio => {
            if (audio && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
        document.querySelectorAll(".play-pause-button").forEach(button => {
            const lang = button.dataset.lang;
            if (lang === "english") button.textContent = "Play English / 播放英文";
            else if (lang === "chinese") button.textContent = "Play Chinese / 播放中文";
            else if (lang === "english-moral") button.textContent = "Play Moral (EN) / 播放寓意(英)";
            else if (lang === "chinese-moral") button.textContent = "Play Moral (CN) / 播放寓意(中)";
            else if (lang === "sg-explanation1-en") button.textContent = "Play Explanation 1 (EN)";
            else if (lang === "sg-explanation2-en") button.textContent = "Play Explanation 2 (EN)";
            else if (lang === "sg-explanation1-zh") button.textContent = "播放解释 1 (中)";
            else if (lang === "sg-explanation2-zh") button.textContent = "播放解释 2 (中)";
            else if (lang && lang.startsWith("sg-example-")) {
                 button.textContent = currentLanguage === "english" ? `Play Example ${lang.split("-")[2]} (EN)` : `播放例子 ${lang.split("-")[2]} (中)`
            }
        });
        activeAudio = null;
    }

    function updateScene() {
        stopAllAudio();
        const scene = storyData[currentSceneIndex];
        sceneImage.src = scene.image;
        englishParagraph.textContent = scene.english;
        chineseParagraph.textContent = scene.chinese;
        englishAudio.src = scene.audio_en;
        chineseAudio.src = scene.audio_zh;
        
        sceneImage.classList.remove("animate-jump");
        if (currentSceneIndex === 1) {
            void sceneImage.offsetWidth; // Trigger reflow to restart animation
            sceneImage.classList.add("animate-jump");
        }
        updateLanguageDisplay();
        updateButtonStates();
    }

    function updateLanguageDisplay() {
        stopAllAudio();
        if (currentLanguage === "english") {
            englishTextDiv.classList.add("active-text");
            chineseTextDiv.classList.remove("active-text");
            sgTitleEn.style.display = "block";
            sgTitleZh.style.display = "none";
            sgExplanationEn.style.display = "block";
            sgExplanationZh.style.display = "none";
            toggleLanguageButton.textContent = "Switch to Chinese / 切换到中文";
        } else {
            chineseTextDiv.classList.add("active-text");
            englishTextDiv.classList.remove("active-text");
            sgTitleEn.style.display = "none";
            sgTitleZh.style.display = "block";
            sgExplanationEn.style.display = "none";
            sgExplanationZh.style.display = "block";
            toggleLanguageButton.textContent = "Switch to English / 切换到英文";
        }
        populateSourGrapesExamples(); 
    }

    function updateButtonStates() {
        prevSceneButton.disabled = currentSceneIndex === 0;
        nextSceneButton.disabled = currentSceneIndex === storyData.length - 1;
    }

    prevSceneButton.addEventListener("click", () => {
        if (currentSceneIndex > 0) {
            currentSceneIndex--;
            updateScene();
        }
    });

    nextSceneButton.addEventListener("click", () => {
        if (currentSceneIndex < storyData.length - 1) {
            currentSceneIndex++;
            updateScene();
        }
    });

    toggleLanguageButton.addEventListener("click", () => {
        currentLanguage = currentLanguage === "english" ? "chinese" : "english";
        updateLanguageDisplay();
    });

    function setupPlayPauseButton(button, audio, playTextEn, pauseTextEn, playTextZh, pauseTextZh) {
        button.addEventListener("click", () => {
            const isEnglish = currentLanguage === "english";
            const playText = isEnglish ? playTextEn : playTextZh;
            const pauseText = isEnglish ? pauseTextEn : pauseTextZh;
            
            // If another audio is playing, stop it
            if (activeAudio && activeAudio !== audio && !activeAudio.paused) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
                // Reset previous button text
                const prevButton = document.querySelector(`.play-pause-button[data-active-audio="true"]`);
                if (prevButton) {
                    const prevLang = prevButton.dataset.lang;
                    if (prevLang === "english") prevButton.textContent = "Play English / 播放英文";
                    else if (prevLang === "chinese") prevButton.textContent = "Play Chinese / 播放中文";
                    else if (prevLang === "english-moral") prevButton.textContent = "Play Moral (EN) / 播放寓意(英)";
                    else if (prevLang === "chinese-moral") prevButton.textContent = "Play Moral (CN) / 播放寓意(中)";
                    else if (prevLang === "sg-explanation1-en") prevButton.textContent = "Play Explanation 1 (EN)";
                    else if (prevLang === "sg-explanation2-en") prevButton.textContent = "Play Explanation 2 (EN)";
                    else if (prevLang === "sg-explanation1-zh") prevButton.textContent = "播放解释 1 (中)";
                    else if (prevLang === "sg-explanation2-zh") prevButton.textContent = "播放解释 2 (中)";
                    else if (prevLang && prevLang.startsWith("sg-example-")) {
                        prevButton.textContent = isEnglish ? `Play Example ${prevLang.split("-")[2]} (EN)` : `播放例子 ${prevLang.split("-")[2]} (中)`
                    }
                    prevButton.removeAttribute("data-active-audio");
                }
            }

            if (audio.paused) {
                audio.play();
                button.textContent = pauseText;
                activeAudio = audio;
                button.setAttribute("data-active-audio", "true");
            } else {
                audio.pause();
                button.textContent = playText;
                activeAudio = null;
                button.removeAttribute("data-active-audio");
            }
            audio.onended = () => {
                button.textContent = playText;
                activeAudio = null;
                button.removeAttribute("data-active-audio");
            };
        });
    }

    document.querySelectorAll(".play-pause-button").forEach(button => {
        const lang = button.dataset.lang;
        let targetAudio, playTextEn, pauseTextEn, playTextZh, pauseTextZh;

        switch(lang) {
            case "english":
                targetAudio = englishAudio; playTextEn = "Play English"; pauseTextEn = "Pause English"; playTextZh = "播放英文"; pauseTextZh = "暂停英文";
                break;
            case "chinese":
                targetAudio = chineseAudio; playTextEn = "Play Chinese"; pauseTextEn = "Pause Chinese"; playTextZh = "播放中文"; pauseTextZh = "暂停中文";
                break;
            case "english-moral":
                targetAudio = englishMoralAudio; playTextEn = "Play Moral (EN)"; pauseTextEn = "Pause Moral (EN)"; playTextZh = "播放寓意(英)"; pauseTextZh = "暂停寓意(英)";
                break;
            case "chinese-moral":
                targetAudio = chineseMoralAudio; playTextEn = "Play Moral (CN)"; pauseTextEn = "Pause Moral (CN)"; playTextZh = "播放寓意(中)"; pauseTextZh = "暂停寓意(中)";
                break;
            case "sg-explanation1-en":
                targetAudio = sgExplanation1EnAudio; playTextEn = "Play Explanation 1 (EN)"; pauseTextEn = "Pause Explanation 1 (EN)"; playTextZh = "Play Explanation 1 (EN)"; pauseTextZh = "Pause Explanation 1 (EN)";
                break;
            case "sg-explanation2-en":
                targetAudio = sgExplanation2EnAudio; playTextEn = "Play Explanation 2 (EN)"; pauseTextEn = "Pause Explanation 2 (EN)"; playTextZh = "Play Explanation 2 (EN)"; pauseTextZh = "Pause Explanation 2 (EN)";
                break;
            case "sg-explanation1-zh":
                targetAudio = sgExplanation1ZhAudio; playTextEn = "播放解释 1 (中)"; pauseTextEn = "暂停解释 1 (中)"; playTextZh = "播放解释 1 (中)"; pauseTextZh = "暂停解释 1 (中)";
                break;
            case "sg-explanation2-zh":
                targetAudio = sgExplanation2ZhAudio; playTextEn = "播放解释 2 (中)"; pauseTextEn = "暂停解释 2 (中)"; playTextZh = "播放解释 2 (中)"; pauseTextZh = "暂停解释 2 (中)";
                break;
        }
        if (targetAudio) {
            // For main story and moral, button text includes both languages
            if (["english", "chinese", "english-moral", "chinese-moral"].includes(lang)) {
                 button.textContent = currentLanguage === "english" ? `${playTextEn} / ${playTextZh}` : `${playTextZh} / ${playTextEn}`;
                 if (lang === "english" || lang === "english-moral") {
                    setupPlayPauseButton(button, targetAudio, `${playTextEn} / ${playTextZh}`, `${pauseTextEn} / ${pauseTextZh}`, `${playTextEn} / ${playTextZh}`, `${pauseTextEn} / ${pauseTextZh}`);
                 } else {
                    setupPlayPauseButton(button, targetAudio, `${playTextZh} / ${playTextEn}`, `${pauseTextZh} / ${pauseTextEn}`, `${playTextZh} / ${playTextEn}`, `${pauseTextZh} / ${pauseTextEn}`);
                 }
            } else { // For SG page, button text is single language
                setupPlayPauseButton(button, targetAudio, playTextEn, pauseTextEn, playTextZh, pauseTextZh);
            }
        }
    });

    function populateSourGrapesExamples() {
        sourGrapesExamplesList.innerHTML = ""; 
        sourGrapesExamples.forEach((example, index) => {
            const li = document.createElement("li");
            const textSpan = document.createElement("span");
            textSpan.textContent = currentLanguage === "english" ? example.english : example.chinese;
            li.appendChild(textSpan);

            const audioSrc = currentLanguage === "english" ? example.audio_en : example.audio_zh;
            const exampleAudio = document.createElement("audio");
            exampleAudio.src = audioSrc;
            exampleAudio.id = `sg-example-${index + 1}-${currentLanguage}-audio`;
            li.appendChild(exampleAudio);

            const playButton = document.createElement("button");
            playButton.classList.add("play-pause-button", "sg-audio-button");
            const buttonLangSuffix = currentLanguage === "english" ? "(EN)" : "(中)";
            const playText = currentLanguage === "english" ? `Play Example ${index + 1} ${buttonLangSuffix}` : `播放例子 ${index + 1} ${buttonLangSuffix}`;
            const pauseText = currentLanguage === "english" ? `Pause Example ${index + 1} ${buttonLangSuffix}` : `暂停例子 ${index + 1} ${buttonLangSuffix}`;
            playButton.textContent = playText;
            playButton.dataset.lang = `sg-example-${index + 1}-${currentLanguage}`;
            setupPlayPauseButton(playButton, exampleAudio, playText, pauseText, playText, pauseText);
            li.appendChild(playButton);

            li.addEventListener("click", (e) => {
                if (e.target !== playButton) { // Prevent toggling selected if button is clicked
                    li.classList.toggle("selected");
                }
            });
            sourGrapesExamplesList.appendChild(li);
        });
    }

    openSourGrapesButton.addEventListener("click", () => {
        stopAllAudio();
        mainStoryContent.style.display = "none";
        sourGrapesMomentPage.style.display = "block";
        updateLanguageDisplay(); 
    });

    closeSourGrapesButton.addEventListener("click", () => {
        stopAllAudio();
        mainStoryContent.style.display = "block";
        sourGrapesMomentPage.style.display = "none";
        updateScene(); 
    });

    englishMoralP.textContent = moral.english;
    chineseMoralP.textContent = moral.chinese;
    englishMoralAudio.src = moral.audio_en;
    chineseMoralAudio.src = moral.audio_zh;

    updateScene();
});

