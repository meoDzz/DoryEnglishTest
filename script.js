// // // ⚠️ DÁN LINK WEB APP CỦA BẠN Ở ĐÂY
// // const GAS_URL = "https://script.google.com/macros/s/AKfycbwX2qAKkXHG7QBKj9Mom6tTXBGMsBZedJ__dhSIDSZdtuYppwMxpIk3cN9zEF-tSuC0cw/exec";

// // const loginContainer = document.getElementById('login-container');
// // const quizContainer = document.getElementById('quiz-container');
// // const resultContainer = document.getElementById('result-container');
// // const questionsWrapper = document.getElementById('questions-wrapper');
// // const loginMessage = document.getElementById('login-message');
// // const timeLeftSpan = document.getElementById('time-left');

// // let currentQuestions = [];
// // let timerInterval;
// // const TOTAL_TIME = 15 * 60; // 15 phút = 900 giây

// // // --- 1. HÀM BẮT ĐẦU ---
// // async function startQuiz() {
// //     const sbd = document.getElementById('student-sbd').value;
// //     const name = document.getElementById('student-name').value;
// //     const pass = document.getElementById('student-password').value;

// //     if (!sbd || !name || !pass) {
// //         loginMessage.textContent = "Vui lòng điền đủ thông tin!";
// //         return;
// //     }

// //     loginMessage.textContent = "Đang tải đề thi tổng hợp...";

// //     try {
// //         const res = await fetch('questions.json');
// //         const data = await res.json();

// //         // --- LOGIC MỚI: GỘP 3 VÒNG ---
// //         let qRound1 = shuffleArray(data.round1 || []).slice(0, 10); // Lấy 10 câu vòng 1
// //         let qRound2 = shuffleArray(data.round2 || []).slice(0, 10); // Lấy 10 câu vòng 2
// //         let qRound3 = shuffleArray(data.round3 || []).slice(0, 10); // Lấy 10 câu vòng 3

// //         // Đánh dấu để hiển thị tiêu đề phân cách
// //         if(qRound1.length > 0) qRound1[0].isRoundHeader = "Vòng 1: Khởi Động";
// //         if(qRound2.length > 0) qRound2[0].isRoundHeader = "Vòng 2: Tăng Tốc";
// //         if(qRound3.length > 0) qRound3[0].isRoundHeader = "Vòng 3: Về Đích";

// //         // Gộp lại thành 1 danh sách duy nhất
// //         currentQuestions = [...qRound1, ...qRound2, ...qRound3];

// //         if (currentQuestions.length === 0) throw new Error("Không tìm thấy câu hỏi nào!");

// //         renderQuestions();

// //         // Chuyển màn hình
// //         loginContainer.classList.add('hidden');
// //         quizContainer.classList.remove('hidden');

// //         // Bắt đầu đếm ngược
// //         startTimer(TOTAL_TIME);

// //     } catch (err) {
// //         loginMessage.textContent = "Lỗi: " + err.message;
// //     }
// // }

// // // --- 2. HÀM ĐẾM NGƯỢC (TIMER) ---
// // function startTimer(duration) {
// //     let timer = duration, minutes, seconds;

// //     // Cập nhật ngay lập tức lần đầu
// //     updateTimerDisplay(timer);

// //     timerInterval = setInterval(function () {
// //         timer--; // Giảm 1 giây

// //         updateTimerDisplay(timer);

// //         // Nếu hết giờ
// //         if (timer < 0) {
// //             clearInterval(timerInterval);
// //             alert("⏰ HẾT GIỜ! Hệ thống sẽ tự động nộp bài.");
// //             submitQuiz(true); // true = nộp do hết giờ
// //         }
// //     }, 1000);
// // }

// // function updateTimerDisplay(timer) {
// //     let minutes = parseInt(timer / 60, 10);
// //     let seconds = parseInt(timer % 60, 10);

// //     minutes = minutes < 10 ? "0" + minutes : minutes;
// //     seconds = seconds < 10 ? "0" + seconds : seconds;

// //     timeLeftSpan.textContent = minutes + ":" + seconds;

// //     // Đổi màu đỏ khi còn dưới 1 phút
// //     if (timer < 60) {
// //         timeLeftSpan.style.color = "red";
// //         timeLeftSpan.style.animation = "blink 1s infinite"; // (Cần thêm css blink nếu muốn nhấp nháy)
// //     }
// // }

// // // --- 3. HÀM HIỂN THỊ (RENDER) ---
// // function renderQuestions() {
// //     questionsWrapper.innerHTML = "";

// //     currentQuestions.forEach((q, index) => {
// //         const idx = index + 1;

// //         // Thêm tiêu đề vòng thi (Header) nếu có
// //         if (q.isRoundHeader) {
// //             questionsWrapper.innerHTML += `<div class="round-divider">${q.isRoundHeader}</div>`;
// //         }

// //         // ... (Phần code xử lý Media/Audio/Type giữ nguyên như cũ) ...
// //         // CODE BÊN DƯỚI GIỐNG HỆT BÀI TRƯỚC, COPY LẠI ĐỂ TIẾT KIỆM DÒNG CHO BẠN

// //         let mediaHTML = "";
// //         if(q.image) mediaHTML += `<img src="${q.image}" class="q-img">`;
// //         if(q.audio) {
// //             let events = q.limitListen ? `onended="disableAudio(this)"` : "";
// //             let warn = q.limitListen ? `<p style="color:red;font-size:0.8em">(Chỉ được nghe 1 lần)</p>` : "";
// //             mediaHTML += `<div class="audio-box"><audio controls ${events} src="${q.audio}"></audio>${warn}</div>`;
// //         }

// //         let answerHTML = "";

// //         if(q.questionType === "fill_blank") {
// //             answerHTML = `<p style="font-style:italic;">${q.sentence}</p><input type="text" class="fill-input" name="q-${idx}" autocomplete="off">`;
// //         } 
// //         else if(q.questionType === "arrange_images") {
// //             let items = q.items.map(item => `
// //                 <div class="arrange-item">
// //                     <div class="arrange-label">${item.id}</div>
// //                     <img src="${item.image}">
// //                     <input type="number" class="arrange-input" data-id="${item.id}" name="q-${idx}-arrange" min="1" max="10">
// //                 </div>`).join('');
// //             answerHTML = `<div class="arrange-container">${items}</div>`;
// //         }
// //         else if(q.questionType === "rearrange_words") {
// //             let words = q.words.map(w => `<button class="word-btn" onclick="moveWord(this, ${idx})">${w}</button>`).join('');
// //             answerHTML = `<div class="rearrange-container"><div class="answer-zone" id="zone-${idx}"></div><div class="word-bank" id="bank-${idx}">${words}</div></div>`;
// //         }
// //         else { // Trắc nghiệm
// //             let isImg = q.optionType === "image";
// //             let cls = isImg ? "options-grid" : "options";
// //             let opts = q.options.map(opt => {
// //                 let c = isImg ? `<img src="${opt}">` : `<span>${opt}</span>`;
// //                 let lc = isImg ? "option-image-box" : "";
// //                 return `<label class="${lc}"><input type="radio" name="q-${idx}" value="${opt}"> ${c}</label>`;
// //             }).join('');
// //             answerHTML = `<div class="${cls}">${opts}</div>`;
// //         }

// //         questionsWrapper.innerHTML += `
// //             <div class="question-block">
// //                 <p class="question-text">Câu ${idx}: ${q.question}</p>
// //                 <div class="question-media">${mediaHTML}</div>
// //                 ${answerHTML}
// //             </div>`;
// //     });
// // }

// // // --- 4. HÀM NỘP BÀI ---
// // async function submitQuiz(isAutoSubmit = false) {
// //     // Dừng đồng hồ
// //     clearInterval(timerInterval);

// //     const btn = document.getElementById('submit-btn');
// //     btn.disabled = true;
// //     btn.textContent = isAutoSubmit ? "Hết giờ! Đang nộp..." : "Đang nộp bài...";

// //     // Thu thập đáp án (Giữ nguyên logic cũ)
// //     const answers = [];
// //     currentQuestions.forEach((q, index) => {
// //         const idx = index + 1;
// //         let val = "Chưa làm";

// //         if(q.questionType === "fill_blank") {
// //             let inp = document.querySelector(`input[name="q-${idx}"]`);
// //             if(inp) val = inp.value.trim();
// //         }
// //         else if(q.questionType === "arrange_images") {
// //             let inps = document.querySelectorAll(`input[name="q-${idx}-arrange"]`);
// //             let arr = [];
// //             inps.forEach(i => { if(i.value) arr.push(i.dataset.id + "-" + i.value); });
// //             if(arr.length > 0) val = arr.join(", ");
// //         }
// //         else if(q.questionType === "rearrange_words") {
// //             let zone = document.getElementById(`zone-${idx}`);
// //             if (zone) {
// //                 let btns = zone.querySelectorAll('.word-btn');
// //                 let textArr = [];
// //                 btns.forEach(b => textArr.push(b.textContent));
// //                 if(textArr.length > 0) val = textArr.join(" ");
// //             }
// //         }
// //         else {
// //             let chk = document.querySelector(`input[name="q-${idx}"]:checked`);
// //             if(chk) val = chk.value;
// //         }
// //         answers.push({ question: q.question, answer: val, correct: q.answer });
// //     });

// //     // Gửi lên GAS
// //     const payload = {
// //         sbd: document.getElementById('student-sbd').value,
// //         name: document.getElementById('student-name').value,
// //         class: document.getElementById('student-class').value,
// //         password: document.getElementById('student-password').value,
// //         answers: answers
// //     };

// //     try {
// //         const req = await fetch(GAS_URL, {
// //             method: 'POST',
// //             body: JSON.stringify(payload)
// //         });
// //         const res = await req.json();

// //         quizContainer.classList.add('hidden');
// //         resultContainer.classList.remove('hidden');

// //         if(res.success) {
// //             document.getElementById('result-message').textContent = "✅ Nộp bài thành công!";
// //             document.getElementById('result-detail').textContent = "Chúc mừng bạn đã hoàn thành bài thi.";
// //         } else {
// //             document.getElementById('result-message').textContent = "❌ Có lỗi: " + res.message;
// //         }
// //     } catch (e) {
// //         alert("Lỗi mạng: " + e.message);
// //         btn.disabled = false; // Cho phép thử lại nếu lỗi mạng
// //     }
// // }

// // // Các hàm hỗ trợ (Giữ nguyên)
// // window.moveWord = function(btn, idx) { /* code cũ */ 
// //     const bank = document.getElementById(`bank-${idx}`);
// //     const zone = document.getElementById(`zone-${idx}`);
// //     if(btn.parentElement === bank) { zone.appendChild(btn); btn.classList.add('selected'); }
// //     else { bank.appendChild(btn); btn.classList.remove('selected'); }
// // }
// // window.disableAudio = function(el) { /* code cũ */ 
// //     el.controls = false;
// //     let msg = document.createElement("span");
// //     msg.innerHTML = " ✅ Đã nghe xong";
// //     msg.style.color = "green";
// //     el.parentElement.appendChild(msg);
// // }
// // function shuffleArray(array) { return array.sort(() => Math.random() - 0.5); }

// // document.getElementById('start-btn').addEventListener('click', startQuiz);
// // document.getElementById('submit-btn').addEventListener('click', () => submitQuiz(false));


// // ⚠️ DÁN LINK WEB APP GAS CỦA BẠN Ở ĐÂY
// const GAS_URL = "https://script.google.com/macros/s/AKfycbxdGIywukv3g90v8yLia4FA6-F0xn86frboNv1D3TlEazgpLZlGUnEGEQwpvSGHIZViBA/exec";

// // DOM Elements
// const loginContainer = document.getElementById('login-container');
// const quizContainer = document.getElementById('quiz-container');
// const resultContainer = document.getElementById('result-container');
// const questionsWrapper = document.getElementById('questions-wrapper');
// const loginMessage = document.getElementById('login-message');
// const timeLeftSpan = document.getElementById('time-left');
// const resultMessage = document.getElementById('result-message');
// const resultDetail = document.getElementById('result-detail');

// let currentQuestions = [];
// let timerInterval;
// const TOTAL_TIME = 15 * 60; // 15 phút
// let startTime; // Biến lưu thời gian bắt đầu

// // --- 1. HÀM BẮT ĐẦU ---
// async function startQuiz() {
//     const sbd = document.getElementById('student-sbd').value;
//     const name = document.getElementById('student-name').value;
//     const pass = document.getElementById('student-password').value;

//     if (!sbd || !name || !pass) {
//         loginMessage.textContent = "Vui lòng điền đủ thông tin!";
//         return;
//     }

//     loginMessage.textContent = "Đang tải đề thi...";

//     try {
//         const res = await fetch('questions.json');
//         const data = await res.json();

//         // Gộp đề (Logic cũ)
//         let qRound1 = shuffleArray(data.round1 || []).slice(0, 10);
//         let qRound2 = shuffleArray(data.round2 || []).slice(0, 10);
//         let qRound3 = shuffleArray(data.round3 || []).slice(0, 10);

//         if(qRound1.length > 0) qRound1[0].isRoundHeader = "Vòng 1: Khởi Động";
//         if(qRound2.length > 0) qRound2[0].isRoundHeader = "Vòng 2: Tăng Tốc";
//         if(qRound3.length > 0) qRound3[0].isRoundHeader = "Vòng 3: Về Đích";

//         currentQuestions = [...qRound1, ...qRound2, ...qRound3];
//         if (currentQuestions.length === 0) throw new Error("Không có câu hỏi.");

//         renderQuestions();

//         // Ghi nhận thời gian bắt đầu thực tế
//         startTime = new Date();

//         loginContainer.classList.add('hidden');
//         quizContainer.classList.remove('hidden');
//         startTimer(TOTAL_TIME);

//     } catch (err) {
//         loginMessage.textContent = "Lỗi: " + err.message;
//     }
// }

// // --- 2. RENDER CÂU HỎI (Giữ nguyên logic hiển thị) ---
// function renderQuestions() {
//     questionsWrapper.innerHTML = "";
//     currentQuestions.forEach((q, index) => {
//         const idx = index + 1;
//         if (q.isRoundHeader) questionsWrapper.innerHTML += `<div class="round-divider">${q.isRoundHeader}</div>`;

//         let mediaHTML = "";
//         if(q.image) mediaHTML += `<img src="${q.image}" class="q-img">`;
//         if(q.audio) {
//             let events = q.limitListen ? `onended="disableAudio(this)"` : "";
//             let warn = q.limitListen ? `<p style="color:red;font-size:0.8em">(Nghe 1 lần)</p>` : "";
//             mediaHTML += `<div class="audio-box"><audio controls ${events} src="${q.audio}"></audio>${warn}</div>`;
//         }

//         let answerHTML = "";
//         if(q.questionType === "fill_blank") {
//             answerHTML = `<p style="font-style:italic;">${q.sentence}</p><input type="text" class="fill-input" name="q-${idx}" autocomplete="off">`;
//         } 
//         else if(q.questionType === "arrange_images") {
//             let items = q.items.map(item => `<div class="arrange-item"><div class="arrange-label">${item.id}</div><img src="${item.image}"><input type="number" class="arrange-input" data-id="${item.id}" name="q-${idx}-arrange" min="1" max="10"></div>`).join('');
//             answerHTML = `<div class="arrange-container">${items}</div>`;
//         }
//         else if(q.questionType === "rearrange_words") {
//             let words = q.words.map(w => `<button class="word-btn" onclick="moveWord(this, ${idx})">${w}</button>`).join('');
//             answerHTML = `<div class="rearrange-container"><div class="answer-zone" id="zone-${idx}"></div><div class="word-bank" id="bank-${idx}">${words}</div></div>`;
//         }
//         else { 
//             let isImg = q.optionType === "image";
//             let cls = isImg ? "options-grid" : "options";
//             let opts = q.options.map(opt => {
//                 let c = isImg ? `<img src="${opt}">` : `<span>${opt}</span>`;
//                 let lc = isImg ? "option-image-box" : "";
//                 return `<label class="${lc}"><input type="radio" name="q-${idx}" value="${opt}"> ${c}</label>`;
//             }).join('');
//             answerHTML = `<div class="${cls}">${opts}</div>`;
//         }

//         questionsWrapper.innerHTML += `<div class="question-block"><p class="question-text">Câu ${idx}: ${q.question}</p><div class="question-media">${mediaHTML}</div>${answerHTML}</div>`;
//     });
// }

// // --- 3. HÀM NỘP BÀI & TÍNH ĐIỂM (NÂNG CẤP) ---
// async function submitQuiz(isAutoSubmit = false) {
//     clearInterval(timerInterval);
//     const btn = document.getElementById('submit-btn');
//     btn.disabled = true;
//     btn.textContent = "Đang chấm điểm...";

//     // A. Tính thời gian làm bài
//     const endTime = new Date();
//     const diffMs = endTime - startTime; // Mili giây
//     const durationStr = msToTime(diffMs); // Chuyển thành Giờ:Phút:Giây
//     const submitDateStr = endTime.toLocaleString('vi-VN'); // Ngày nộp (dd/mm/yyyy hh:mm:ss)

//     // B. Chấm điểm
//     let score = 0;
//     const totalQuestions = currentQuestions.length;
//     const answers = [];

//     currentQuestions.forEach((q, index) => {
//         const idx = index + 1;
//         let userVal = "";

//         // Lấy đáp án người dùng (Logic cũ)
//         if(q.questionType === "fill_blank") {
//             let inp = document.querySelector(`input[name="q-${idx}"]`);
//             if(inp) userVal = inp.value.trim();
//         }
//         else if(q.questionType === "arrange_images") {
//             let inps = document.querySelectorAll(`input[name="q-${idx}-arrange"]`);
//             let arr = [];
//             inps.forEach(i => { if(i.value) arr.push(i.dataset.id + "-" + i.value); });
//             if(arr.length > 0) userVal = arr.join(", ");
//         }
//         else if(q.questionType === "rearrange_words") {
//             let zone = document.getElementById(`zone-${idx}`);
//             if (zone) {
//                 let btns = zone.querySelectorAll('.word-btn');
//                 let textArr = [];
//                 btns.forEach(b => textArr.push(b.textContent));
//                 if(textArr.length > 0) userVal = textArr.join(" ");
//             }
//         }
//         else {
//             let chk = document.querySelector(`input[name="q-${idx}"]:checked`);
//             if(chk) userVal = chk.value;
//         }

//         // SO SÁNH ĐÁP ÁN (Chấm điểm)
//         // Chuyển hết về chữ thường và xóa khoảng trắng thừa để so sánh chính xác
//         let isCorrect = false;
//         if (userVal && q.answer) {
//             if (compareAnswers(userVal, q.answer)) {
//                 score++;
//                 isCorrect = true;
//             }
//         }

//         answers.push({ 
//             question: q.question, 
//             answer: userVal || "Bỏ trống", 
//             correct: q.answer,
//             isCorrect: isCorrect 
//         });
//     });

//     // Hiển thị điểm số dạng: 8/10
//     const finalScoreStr = `${score}/${totalQuestions}`;

//     // C. Gửi lên GAS
//     const payload = {
//         sbd: document.getElementById('student-sbd').value,
//         name: document.getElementById('student-name').value,
//         class: document.getElementById('student-class').value,
//         password: document.getElementById('student-password').value,
//         answers: answers,
//         score: finalScoreStr,       // Gửi điểm
//         submitTime: submitDateStr,  // Gửi ngày giờ nộp
//         duration: durationStr       // Gửi thời gian làm
//     };

//     try {
//         const req = await fetch(GAS_URL, {
//             method: 'POST',
//             body: JSON.stringify(payload)
//         });
//         const res = await req.json();

//         quizContainer.classList.add('hidden');
//         resultContainer.classList.remove('hidden');

//         if(res.success) {
//             resultMessage.textContent = `🎉 Điểm của bạn: ${finalScoreStr}`;
//             resultDetail.innerHTML = `
//                 <p>Thời gian làm bài: <strong>${durationStr}</strong></p>
//                 <p>Ngày nộp: ${submitDateStr}</p>
//                 <p>${res.message}</p>
//             `;
//             resultMessage.style.color = "#007bff";
//         } else {
//             resultMessage.textContent = "❌ Có lỗi: " + res.message;
//         }
//     } catch (e) {
//         alert("Lỗi mạng, nhưng điểm của bạn là: " + finalScoreStr);
//         btn.disabled = false;
//     }
// }

// // --- CÁC HÀM HỖ TRỢ ---

// // Hàm so sánh đáp án (không phân biệt hoa thường)
// function compareAnswers(user, correct) {
//     // Xóa dấu câu cơ bản, khoảng trắng và viết thường
//     const clean = (str) => str.toString().toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
//     return clean(user) === clean(correct);
// }

// // Hàm chuyển đổi mili giây sang hh:mm:ss
// function msToTime(duration) {
//     let seconds = Math.floor((duration / 1000) % 60);
//     let minutes = Math.floor((duration / (1000 * 60)) % 60);
//     let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

//     hours = (hours < 10) ? "0" + hours : hours;
//     minutes = (minutes < 10) ? "0" + minutes : minutes;
//     seconds = (seconds < 10) ? "0" + seconds : seconds;

//     return hours + ":" + minutes + ":" + seconds;
// }

// function startTimer(duration) {
//     let timer = duration;
//     updateTimerDisplay(timer);
//     timerInterval = setInterval(function () {
//         timer--;
//         updateTimerDisplay(timer);
//         if (timer < 0) {
//             submitQuiz(true);
//         }
//     }, 1000);
// }

// function updateTimerDisplay(timer) {
//     let minutes = parseInt(timer / 60, 10);
//     let seconds = parseInt(timer % 60, 10);
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;
//     timeLeftSpan.textContent = minutes + ":" + seconds;
//     if (timer < 60) timeLeftSpan.style.color = "red";
// }

// // Các hàm cũ
// window.moveWord = function(btn, idx) { 
//     const bank = document.getElementById(`bank-${idx}`);
//     const zone = document.getElementById(`zone-${idx}`);
//     if(btn.parentElement === bank) { zone.appendChild(btn); btn.classList.add('selected'); }
//     else { bank.appendChild(btn); btn.classList.remove('selected'); }
// }
// window.disableAudio = function(el) { 
//     el.controls = false;
//     let msg = document.createElement("span");
//     msg.innerHTML = " ✅ Đã nghe xong";
//     msg.style.color = "green";
//     el.parentElement.appendChild(msg);
// }
// function shuffleArray(array) { return array.sort(() => Math.random() - 0.5); }

// document.getElementById('start-btn').addEventListener('click', startQuiz);
// document.getElementById('submit-btn').addEventListener('click', () => submitQuiz(false));




// ⚠️ GIỮ NGUYÊN LINK GAS CŨ CỦA BẠN
const GAS_URL = "https://script.google.com/macros/s/AKfycbxdGIywukv3g90v8yLia4FA6-F0xn86frboNv1D3TlEazgpLZlGUnEGEQwpvSGHIZViBA/exec";

// DOM Elements
const loginContainer = document.getElementById('login-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionsWrapper = document.getElementById('questions-wrapper');
const loginMessage = document.getElementById('login-message');
const timeLeftSpan = document.getElementById('time-left');
const resultMessage = document.getElementById('result-message');
const resultDetail = document.getElementById('result-detail');

let currentQuestions = [];
let timerInterval;
const TOTAL_TIME = 1 * 60; // 15 phút
let startTime;

const globalAudio = new Audio();
let currentPlayingBtn = null;



// --- 1. HÀM BẮT ĐẦU ---
async function startQuiz() {
    const sbd = document.getElementById('student-sbd').value;
    const name = document.getElementById('student-name').value;
    const pass = document.getElementById('student-password').value;

    if (!sbd || !name || !pass) {
        loginMessage.textContent = "Vui lòng điền đủ thông tin!";
        return;
    }

    loginMessage.textContent = "Đang tải đề thi...";

    try {
        const res = await fetch('questions.json');
        const data = await res.json();

        // 1. Lấy tất cả câu hỏi từ danh sách chung
        let allQuestions = data.questions || [];

        if (allQuestions.length === 0) throw new Error("Không có câu hỏi.");

        // 2. XÁO TRỘN THỨ TỰ CÂU HỎI
        // Nếu bạn muốn lấy hết: giữ nguyên
        // Nếu bạn muốn lấy ngẫu nhiên 20 câu trong kho 100 câu: .slice(0, 20)
        currentQuestions = shuffleArray(allQuestions);

        // 3. Render và bắt đầu
        renderQuestions();
        startTime = new Date();

        loginContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        startTimer(TOTAL_TIME);

    } catch (err) {
        loginMessage.textContent = "Lỗi tải đề: " + err.message;
        console.error(err);
    }
}

// --- 2. HIỂN THỊ CÂU HỎI (CÓ ĐẢO ĐÁP ÁN) ---
function renderQuestions() {
    questionsWrapper.innerHTML = "";

    currentQuestions.forEach((q, index) => {
        const idx = index + 1;

        // -- MEDIA (Ảnh/Audio) --
        let mediaHTML = "";
        if (q.image) mediaHTML += `<img src="${q.image}" class="q-img">`;
        if (q.audio) {
            // Thay vì tạo thẻ <audio>, ta tạo nút Button gọi hàm playAudio
            // isLimited = true nếu q.limitListen là true
            let isLimited = q.limitListen ? "true" : "false";
            let limitText = q.limitListen ? `<span style="color:red; font-size:0.8em; margin-left:5px">(Nghe 1 lần)</span>` : "";

            mediaHTML += `
                <div class="audio-box">
                    <button class="audio-btn" onclick="playGlobalAudio('${q.audio}', this, ${isLimited})">
                        🔊 Bấm để nghe
                    </button>
                    ${limitText}
                </div>`;
        }

        let answerHTML = "";

        // -- XỬ LÝ TỪNG LOẠI CÂU HỎI --

        // A. Điền từ
        if (q.questionType === "fill_blank") {
            answerHTML = `<p style="font-style:italic;">${q.sentence}</p><input type="text" class="fill-input" name="q-${idx}" autocomplete="off">`;
        }
        // B. Sắp xếp ảnh (ĐẢO THỨ TỰ TRANH HIỂN THỊ)
        else if (q.questionType === "arrange_images") {
            // Tạo bản sao mảng items và xáo trộn nó để hiển thị ngẫu nhiên
            let shuffledItems = shuffleArray([...q.items]);

            let itemsHTML = shuffledItems.map(item => `
                <div class="arrange-item">
                    <div class="arrange-label">${item.id}</div>
                    <img src="${item.image}">
                    <input type="number" class="arrange-input" data-id="${item.id}" name="q-${idx}-arrange" min="1" max="10">
                </div>`).join('');
            answerHTML = `<div class="arrange-container">${itemsHTML}</div>`;
        }
        // C. Sắp xếp từ (ĐẢO THỨ TỰ TỪ)
        else if (q.questionType === "rearrange_words") {
            let shuffledWords = shuffleArray([...q.words]); // Xáo trộn từ
            let wordsHTML = shuffledWords.map(w => `<button class="word-btn" onclick="moveWord(this, ${idx})">${w}</button>`).join('');
            answerHTML = `<div class="rearrange-container"><div class="answer-zone" id="zone-${idx}"></div><div class="word-bank" id="bank-${idx}">${wordsHTML}</div></div>`;
        }
        // D. Trắc nghiệm (ĐẢO THỨ TỰ ĐÁP ÁN A,B,C,D)
        else {
            let isImg = q.optionType === "image";
            let cls = isImg ? "options-grid" : "options";

            // Tạo bản sao và xáo trộn đáp án
            let shuffledOptions = shuffleArray([...q.options]);

            let optsHTML = shuffledOptions.map(opt => {
                let content = isImg ? `<img src="${opt}">` : `<span>${opt}</span>`;
                let lc = isImg ? "option-image-box" : "";
                return `<label class="${lc}"><input type="radio" name="q-${idx}" value="${opt}"> ${content}</label>`;
            }).join('');

            answerHTML = `<div class="${cls}">${optsHTML}</div>`;
        }

        // Ghép vào HTML
        questionsWrapper.innerHTML += `
            <div class="question-block">
                <p class="question-text">Câu ${idx}: ${q.question}</p>
                <div class="question-media">${mediaHTML}</div>
                ${answerHTML}
            </div>`;
    });
}

// --- 3. NỘP BÀI & CHẤM ĐIỂM ---
async function submitQuiz(isAutoSubmit = false) {
    clearInterval(timerInterval);
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = "Đang chấm điểm...";

    // Tính giờ
    const endTime = new Date();
    const diffMs = endTime - startTime;
    const durationStr = msToTime(diffMs);
    const submitDateStr = endTime.toLocaleString('vi-VN');

    // Chấm điểm
    let score = 0;
    const totalQuestions = currentQuestions.length;
    const answers = [];

    currentQuestions.forEach((q, index) => {
        const idx = index + 1;
        let userVal = "";

        if (q.questionType === "fill_blank") {
            let inp = document.querySelector(`input[name="q-${idx}"]`);
            if (inp) userVal = inp.value.trim();
        }
        else if (q.questionType === "arrange_images") {
            let inps = document.querySelectorAll(`input[name="q-${idx}-arrange"]`);
            let arr = [];
            inps.forEach(i => { if (i.value) arr.push(i.dataset.id + "-" + i.value); });
            if (arr.length > 0) userVal = arr.join(", ");
        }
        else if (q.questionType === "rearrange_words") {
            let zone = document.getElementById(`zone-${idx}`);
            if (zone) {
                let btns = zone.querySelectorAll('.word-btn');
                let textArr = [];
                btns.forEach(b => textArr.push(b.textContent));
                if (textArr.length > 0) userVal = textArr.join(" ");
            }
        }
        else { // Trắc nghiệm
            let chk = document.querySelector(`input[name="q-${idx}"]:checked`);
            if (chk) userVal = chk.value;
        }

        // SO SÁNH ĐÁP ÁN
        let isCorrect = false;
        if (userVal && q.answer) {
            if (compareAnswers(userVal, q.answer)) {
                score++;
                isCorrect = true;
            }
        }

        answers.push({
            question: q.question,
            answer: userVal || "Bỏ trống",
            correct: q.answer,
            isCorrect: isCorrect
        });
    });

    const finalScoreStr = `${score}/${totalQuestions}`;

    // Gửi lên GAS
    const payload = {
        sbd: document.getElementById('student-sbd').value,
        name: document.getElementById('student-name').value,
        class: document.getElementById('student-class').value,
        password: document.getElementById('student-password').value,
        answers: answers,
        score: finalScoreStr,
        submitTime: submitDateStr,
        duration: durationStr
    };

    try {
        const req = await fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const res = await req.json();

        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        if (res.success) {
            resultMessage.textContent = `🎉 Điểm: ${finalScoreStr}`;
            resultDetail.innerHTML = `
                <p>Thời gian: <strong>${durationStr}</strong></p>
                <p>Ngày nộp: ${submitDateStr}</p>
                <p>${res.message}</p>
            `;
            resultMessage.style.color = "#007bff";
        } else {
            resultMessage.textContent = "❌ Lỗi: " + res.message;
        }
    } catch (e) {
        alert("Lỗi mạng (Đã lưu điểm tạm thời): " + finalScoreStr);
        btn.disabled = false;
    }
}

// --- CÁC HÀM HỖ TRỢ ---

// Hàm xáo trộn mảng (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function compareAnswers(user, correct) {
    const clean = (str) => str.toString().toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return clean(user) === clean(correct);
}

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
}

function startTimer(duration) {
    let timer = duration;
    updateTimerDisplay(timer);
    timerInterval = setInterval(function () {
        timer--;
        updateTimerDisplay(timer);
        if (timer < 0) submitQuiz(true);
    }, 1000);
}

function updateTimerDisplay(timer) {
    let minutes = parseInt(timer / 60, 10);
    let seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timeLeftSpan.textContent = minutes + ":" + seconds;
    if (timer < 60) timeLeftSpan.style.color = "red";
}

window.moveWord = function (btn, idx) {
    const bank = document.getElementById(`bank-${idx}`);
    const zone = document.getElementById(`zone-${idx}`);
    if (btn.parentElement === bank) { zone.appendChild(btn); btn.classList.add('selected'); }
    else { bank.appendChild(btn); btn.classList.remove('selected'); }
}

window.disableAudio = function (el) {
    el.controls = false;
    let msg = document.createElement("span");
    msg.innerHTML = " ✅ Đã nghe xong";
    msg.style.color = "green";
    el.parentElement.appendChild(msg);
}

// --- HÀM XỬ LÝ AUDIO MỚI (FIX LỖI QUÁ NHIỀU PLAYER) ---
window.playGlobalAudio = function (url, btn, isLimited) {
    // 1. Nếu đang nghe chính nút này -> Tạm dừng
    if (currentPlayingBtn === btn && !globalAudio.paused) {
        globalAudio.pause();
        btn.innerHTML = "🔊 Tiếp tục nghe";
        btn.classList.remove("playing");
        return;
    }

    // 2. Nếu đang nghe bài khác -> Dừng bài cũ, reset nút cũ
    if (currentPlayingBtn && currentPlayingBtn !== btn) {
        currentPlayingBtn.innerHTML = "🔊 Bấm để nghe";
        currentPlayingBtn.classList.remove("playing");
        // Nếu bài cũ bị giới hạn nghe 1 lần -> Disable luôn
        if (currentPlayingBtn.dataset.limited === "true") {
            currentPlayingBtn.disabled = true;
            currentPlayingBtn.innerHTML = "✅ Đã nghe xong";
        }
    }

    // 3. Bắt đầu phát bài mới
    currentPlayingBtn = btn;
    btn.dataset.limited = isLimited; // Lưu trạng thái giới hạn vào nút
    btn.classList.add("playing");
    btn.innerHTML = "wm Đang phát..."; // Icon sóng nhạc

    globalAudio.src = url;
    globalAudio.play();

    // 4. Xử lý khi nghe xong
    globalAudio.onended = function () {
        btn.classList.remove("playing");
        if (isLimited) {
            btn.disabled = true;
            btn.innerHTML = "✅ Đã nghe xong";
        } else {
            btn.innerHTML = "🔊 Nghe lại";
        }
        currentPlayingBtn = null;
    };

    // Xử lý lỗi nếu file audio hỏng
    globalAudio.onerror = function () {
        btn.classList.remove("playing");
        btn.innerHTML = "❌ Lỗi file audio";
        alert("Không tải được file âm thanh này.");
    };
};

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('submit-btn').addEventListener('click', () => submitQuiz(false));