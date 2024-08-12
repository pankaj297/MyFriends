
        let friendsData = {};

        // Fetch the JSON file and populate the select dropdown
        fetch('friends.json')
            .then(response => response.json())
            .then(data => {
                friendsData = data.friends;
                const selectElement = document.getElementById("friendSelect");
                friendsData.forEach(friend => {
                    const option = document.createElement("option");
                    option.value = friend.name;
                    option.textContent = friend.name;
                    selectElement.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading JSON:', error));

        // Update the image when a friend is selected
        function updateImage() {
            const selectedName = document.getElementById("friendSelect").value;
            const friend = friendsData.find(f => f.name === selectedName);
            const friendImage = document.getElementById("friendImage");
           

           if (friend && friend.image) {
               friendImage.src = friend.image;
             } else {
               friendImage.src = "/images/pankaj.jpeg"; //  default image
             }
        }

        function generateMessage() {
          const selectedName = document.getElementById("friendSelect").value;
          const friend = friendsData.find((f) => f.name === selectedName);
          const messageContainer = document.getElementById("message");

          if (!selectedName) {
            messageContainer.innerHTML =
              "<p>Please select a friend to view the message.</p>";
            return;
          }

          if (!friend) return; //friend is not found, exit the function.

          messageContainer.innerHTML = ""; //Clear  previous messages.

          const sections = [
            `<div class="section"><h2>Introduction</h2><p>${friend.introduction}</p></div>`,
            `<div class="section"><h2>Professional Side</h2><p>${friend.professional}</p></div>`,
            `<div class="section"><h2>Personal Side</h2><p>${friend.personal}</p></div>`,
            `<div class="section"><h2>Future Potential</h2><p>${friend.future}</p></div>`,
            `<div class="section"><h2>As a Friend</h2><p>${friend.asFriend}</p></div>`,
            `<div class="section small-message">${friend.smallMessage}</div>`,
            `<div class="section thanks">${friend.thx}</div>`,

            // <h3>🎉🎊🎆🎇✨ Thank You 🎉🎊🎆🎇✨</h3>
          ];
  
          sections.forEach((section, index) => {
            setTimeout(() => {
              const sectionElement = document.createElement("div");
              sectionElement.innerHTML = section;
              messageContainer.appendChild(sectionElement);

              setTimeout(() => {
                sectionElement
                  .querySelector(".section")
                  .classList.add("visible");
              }, 100);
            }, index * 700);
          });
        }
       
    