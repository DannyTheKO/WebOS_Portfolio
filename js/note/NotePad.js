import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";

fetch("/app/NotePad.html")
    .then(response => response.text())
    .then(data => {
        // Initialize Note HTML Body
        document.getElementById("Note_Container").innerHTML = data;

        // Get and extract element
        const noteWindow = document.querySelector("#Note")
        const {
            element: element,
            header: header,
            header_action: header_action
        } = windowElement(noteWindow);

        // HEY
        element.style.display = "flex"

        // Add open and close button
        const btnOpen = btnOpenAndClose(element, header_action);

        // Add Drag Element function
        dragElement(element, header); // Windows
        dragElement(btnOpen); // Icon

        // Initialize Note Application Logic
        const noteMain = noteWindow.querySelector(".Note_main");

        const noteTitle = noteMain.querySelector(".noteTitle");
        const notePage = noteMain.querySelector(".notePage");
        const noteHeader = noteMain.querySelector(".Note_header");

        const containerGrid = noteMain.querySelector(".container_grid")
        const toggleSidebar = noteMain.querySelector("#toggle_sidebar"); // Sidebar Button
        const toggleSidebar_Btn_Image = toggleSidebar.querySelector(".svg") // Image

        //#region Sidebar Toggle
        toggleSidebar.addEventListener("click", () => {
            const isVisible = getComputedStyle(noteTitle).display !== 'none';
            btnReaction(toggleSidebar, isVisible)
            sidebarReaction(containerGrid, noteTitle, isVisible)
        });

        function btnReaction(toggleSidebar, state) {
            toggleSidebar.style.transition = `
            height 0.1s ease 0.1s,
            width 0.1s ease 0.2s,
            padding 0.1s ease 0.15s
            `

            toggleSidebar_Btn_Image.style.transition = `opacity 0.2s ease 0s`

            setTimeout(() => {
                toggleSidebar.style.cursor = "default"
                toggleSidebar.style.width = "0"
                toggleSidebar.style.height = "0"
                toggleSidebar.style.padding = "0"
                toggleSidebar_Btn_Image.style.opacity = "0"
            }, 0)

            if (state) {
                setTimeout(() => {
                    toggleSidebar.style.cursor = "pointer"
                    toggleSidebar_Btn_Image.style.opacity = "1"
                    toggleSidebar.style.width = "36px"
                    toggleSidebar.style.height = "36px"
                    toggleSidebar.style.padding = "6px"
                    toggleSidebar_Btn_Image.src = "svg/enlarge-btn.svg"
                }, 300)
            }
            else {
                setTimeout(() => {
                    toggleSidebar.style.cursor = "pointer"
                    toggleSidebar_Btn_Image.style.opacity = "1"
                    toggleSidebar.style.width = "36px"
                    toggleSidebar.style.height = "36px"
                    toggleSidebar.style.padding = "6px"
                    toggleSidebar_Btn_Image.src = "svg/collapse-btn.svg"
                }, 300)
            }
        }

        function sidebarReaction(containerGrid, noteTitle, state) {
            // S: 0s, D: 0.3s, E: 0.3s
            containerGrid.style.transition = `
                        grid-template-columns 0.3s ease 0s,
                        column-gap 0.1s ease 0.2s,
                        padding 0.1s ease 0.2s`

            // S: 0s, D: 0.3s + 0.1s, E: 0.3s
            noteTitle.style.transition = `
                        opacity 0.3s ease 0s,
                        padding 0.1s ease 0.1s`

            if (state) {
                // Start animation with 0 sec delay
                setTimeout(() => {
                    containerGrid.style.columnGap = "0px"
                    containerGrid.style.gridTemplateColumns = "0.75fr 3fr"
                }, 0);

                setTimeout(() => {
                    noteTitle.style.padding = "128px 6px 0 0" // Start going down
                    noteTitle.style.opacity = "0"
                    containerGrid.style.gridTemplateColumns = "0fr 1fr"
                }, 100);

                setTimeout(() => {
                    noteTitle.style.display = 'none';
                }, 250);
            }
            else {
                // Start animation with 0 sec delay
                noteTitle.style.display = 'flex';

                setTimeout(() => {
                    containerGrid.style.columnGap = "12px"
                    noteTitle.style.opacity = "1"
                    noteTitle.style.padding = "48px 0 0 0" // Start going up
                }, 0);

                setTimeout(() => {
                    containerGrid.style.gridTemplateColumns = "0.9fr 3fr"
                }, 100)

                setTimeout(() => {
                    containerGrid.style.gridTemplateColumns = "0.7fr 3fr"
                }, 250);
            }
        }
        //#endregion

        // Data
        let notesContent = [
            {
                noteId: 1,
                title: "Danny's Note",
                date: "12/23/2024",
                contentURL: `
        <div style="padding: 24px 4em;" contenteditable="false">
            <div style="
                font-family: var(--font-family-special);
                font-size: var(--font-size-medium);">
                <h1>Danny's Note</h1>
                <h2>[ 08/08/2002 | 11:00:00 PM ]</h2>
                <hr>
            </div>
            <div>
                <img src="../img/night.gif" alt="Image"
                style="
                object-fit: contain;
                width: 100%;">
            </div>
            <p><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda beatae, natus accusantium magnam corrupti est, repellendus nesciunt, tenetur quae nemo asperiores. Explicabo qui perferendis officia dolorem pariatur nam nisi suscipit.</span><span>Doloribus nostrum nobis totam aliquam minus officiis vel, esse, tempora quae debitis sapiente, modi quam architecto consectetur neque natus ab praesentium! Est possimus molestiae, rerum magni quod mollitia assumenda totam?</span><span>Ducimus dolor ullam modi, officia beatae minima quos error voluptate necessitatibus quidem dolorem eius, nostrum, fugit aliquid quaerat suscipit itaque harum dolorum unde adipisci! Hic eligendi quasi dolores dolorum beatae.</span><span>Quas ut sint culpa et dolore alias provident aut numquam est placeat officia id minus expedita nihil mollitia quasi tenetur accusamus optio, ipsa tempore sunt fugit? Neque dolores nam veniam!</span><span>Vel totam eius necessitatibus eaque repudiandae alias esse dicta quibusdam sed? Veniam quibusdam quam assumenda saepe velit, corrupti explicabo dolorem quod nulla. Quia eius non similique. Sit magnam harum quam.</span></p>
            <p><span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quam error delectus sunt, nulla beatae odio eveniet, aperiam atque voluptatum ullam praesentium laborum ipsa aspernatur quaerat ipsum explicabo sed quia.</span><span>Tempore repellendus est possimus explicabo soluta nostrum, repudiandae, necessitatibus, sequi voluptate aliquid maxime illo esse. Fugiat reiciendis natus excepturi quisquam! Aliquid ab fugit aliquam nulla quis amet consectetur obcaecati quos.</span><span>Sequi voluptatem vitae possimus assumenda quae nobis exercitationem ea iusto qui molestiae laborum doloribus id impedit omnis obcaecati repellat, debitis voluptate similique. Officiis rem ducimus, suscipit quibusdam labore similique expedita!</span><span>Sed amet sint eos modi! Dolor accusamus, alias omnis tempora fugit voluptates beatae eligendi dicta praesentium aliquam obcaecati cupiditate error non consequuntur labore perferendis. Numquam vitae cumque labore magnam architecto.</span><span>Error perferendis iste nulla expedita dicta, aut id numquam sit cumque facere voluptate ullam architecto quaerat dolorum consequuntur earum ad temporibus deleniti sapiente quam consequatur autem. Quaerat ut dignissimos nam?</span></p>
            <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ducimus dolores cupiditate voluptates voluptatibus dicta nam placeat veniam quaerat accusamus doloremque, repellendus exercitationem amet qui quibusdam dignissimos deleniti a possimus.</span><span>Vero, tempora iusto! Hic fuga impedit sapiente, eligendi cum sunt dicta dolore eum neque suscipit minus amet harum porro sequi nisi illo at sint delectus earum consequuntur? Aut, iste repellendus.</span><span>Nostrum, aspernatur molestias. Quam iure, praesentium soluta saepe ratione voluptates dolorum obcaecati veniam, et, cum inventore doloribus odio amet atque suscipit optio culpa. Delectus ipsum rem debitis sequi ab harum?</span><span>Rem aut odit corrupti id natus. Saepe cum cumque labore illo quisquam deserunt quae veniam dolorem quibusdam commodi cupiditate voluptatibus unde assumenda ipsam, dolores nulla possimus voluptates omnis dolore officia?</span><span>Veritatis corporis ab corrupti fugit suscipit laborum amet nobis, laudantium necessitatibus ullam placeat eius, esse voluptatibus aliquid? Rem pariatur magni ad illo similique, debitis minus explicabo vitae odit eos sed!</span></p>
            <p><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolores odio adipisci aperiam, consectetur beatae, nobis dicta consequatur delectus aut sint omnis perferendis, exercitationem voluptas. Consequuntur libero enim modi ad.</span><span>Itaque voluptas inventore assumenda quisquam porro dignissimos autem id, eum harum nostrum cumque consequatur dolore facilis vitae incidunt praesentium quis aspernatur enim vel! Ad quia natus provident, officiis maxime minima.</span><span>Dolor libero velit et officiis sed aspernatur quam quas optio dolorum, consectetur rerum? Nihil dignissimos eveniet minus voluptatibus vero molestias, amet quibusdam totam porro alias adipisci aperiam itaque officiis repellendus.</span><span>Magnam harum voluptatibus, perferendis molestias voluptate non porro id? Commodi tempora assumenda architecto magnam et, nobis natus fuga, dolor optio sequi reprehenderit possimus officia laborum deserunt, blanditiis aut aliquam animi.</span><span>Molestiae pariatur voluptatem iusto cum culpa deleniti at, veniam vel aperiam perspiciatis, esse ad dolorum ut voluptas facilis eligendi et necessitatibus magni numquam libero. Quo quia deleniti laborum recusandae itaque?</span></p>
            <p><span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, ea, fugiat magni possimus facilis voluptate laborum totam, nostrum eum velit maiores dicta dolor quisquam vel iure explicabo consequuntur quod. Dolore.</span><span>Illum expedita quam odit animi modi labore, placeat laboriosam, rem ipsa odio maiores et dicta doloremque, magnam nulla earum culpa pariatur dolores consectetur impedit deleniti eos voluptatem aspernatur natus. Vero.</span><span>Tempora dolor dolores impedit, dolorum hic obcaecati illum neque sapiente culpa ipsam consequuntur quis ratione pariatur, nesciunt odit earum repudiandae, quasi cupiditate beatae iure repellendus? Aperiam consequuntur nemo quis est!</span><span>Sequi distinctio suscipit fugit ea aspernatur repellendus asperiores eius sit! Iste ipsum magni sequi temporibus, quibusdam quos? Repellat autem ab minima iste amet exercitationem eum obcaecati facilis a, molestiae beatae!</span><span>Amet, atque doloribus numquam, officiis necessitatibus expedita culpa nihil aspernatur velit vel ex eveniet. Illum alias fuga animi maiores nemo et ut minima omnis ratione! Aspernatur sequi quibusdam blanditiis exercitationem?</span></p>
        </div>
        `
            },
            {
                noteId: 2,
                title: "Testing 2",
                date: "12/24/2024",
                contentURL: ``
            }
        ];

        function noteContentLoader(notesContent) {
            
        }


    })
    .catch(error => console.error('Error loading introduction:', error));