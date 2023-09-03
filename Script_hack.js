// document.addEventListener("DOMContentLoaded", function () {
//     const menuIcon = document.getElementById("menu-icon");
//     const sidebar = ,document.querySelector(".sidebar");
//     const didyouknowBox = document.querySelector(".did-you-now");

document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    // const menuIcon = document.getElementById("menu-icons");

    const sidebar = document.querySelector(".sidebar");
    //didyouknowBox=document.querySelector(".did-you-now");
    const didYouKnowBox = document.querySelector(".did-you-know");

    menuIcon.addEventListener("click", function() {
        sidebar.classList.toggle("hidden");
        if (sidebar.classList.contains("hidden")) {
            didYouKnowBox.style.display = "block";
            displayRandomFact();
        } else {
            didYouKnowBox.style.display = "none";
        }
    });

    const itemss = document.querySelectorAll('.itemss');

    const items = document.querySelectorAll('.item');

    itemss.forEach((item, index) => {
        item.addEventListener('click', () => {
            itemss.forEach((el) => el.classList.remove('clicked'));
            //itenss.forEach((el) => el.classList.remove('clicked'));

            item.classList.add('clicked');
            items.forEach((element, j) => {
                if (index === j) {
                    element.classList.add('display');
                    element.classList.remove('hidden');
                } else {
                    element.classList.remove('display');
                    element.classList.add('hidden');
                }
            });
        });
    });
    /*if(index==j)
    {
        element.classList.add('hidden');
        element.classList.remove('display');
    }
    else{
         element.classList.add('hidden');
        element.classList.remove('display');
    }
        */
    function fetchData(url, targetElem, dataKe, renderItem) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data[dataKe]) {
                    const dataList = data[dataKe];
                    dataList.forEach((item, index) => {
                        const div = document.createElement("div");
                        div.textContent = renderItem(item, index);
                        div.classList.add(index % 2 === 0 ? "even" : "odd");
                        targetElem.appendChild(div);
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    const spacecrafts = document.querySelector(".spacecrafts");
    fetchData('https://isro.vercel.app/api/spacecrafts', spacecrafts, 'spacecrafts', (item, index) => `${item.id}. ${item.name}`);

    const launchers = document.querySelector(".launchers");
    fetchData('https://isro.vercel.app/api/launchers', launchers, 'launchers', item => `${item.id}`);

    const csItems = document.querySelector(".csItems");
    const search = document.querySelector('.search');

    let customerSatellites = [];

    fetchData('https://isro.vercel.app/api/customer_satellites', csItems, 'customer_satellites', (item, index) => {
        customerSatellites.push(item);
        return `${item.id}  ${item.country}  ${item.launch_date}  ${item.mass}  ${item.launcher} `;
    });

    search.addEventListener('input', () => {
        const filteredInfo = customerSatellites.filter(item => item.country.toLowerCase().includes(search.value.toLowerCase()));
        renderTable(csItems, filteredInfo, index => {
            return `${filteredInfo[index].id }   ${filteredInfo[index].country  }  ${filteredInfo[index].launch_date  }  ${filteredInfo[index].mass  }   ${filteredInfo[index].launcher  } `;
        });
    });

    // const centers = document.querySelector(".centers");
    // let centreInfo = [];

    // fetchData('https://isro.vercel.app/api/centres', centers, 'centres', (item, index) => {
    //     centreInfo.push(item);
    //     return `${item.id} ${item.name}  ${item.Place} ${item.State} `;
    // });
    const amazinggFacts = [
        "The International Space Station will travels at a speed of approximately 28,000 kilometers (17,500 miles) as per hour.",
        "A day on Venus is longer than its year. It takes Venus about 243 Earth days to complete one rotation on its axis.",
        "The largest volcano in the solar system is Olympus Mons on Mars. It stands about 13.6 miles (22 kilometers) high.",
    ];

    function displayRandomFact() {
        const factText = document.getElementById("random-fact");
        const randomIndex = Math.floor(Math.random() * amazinggFacts.length);
        factText.textContent = amazinggFacts[randomIndex];
    }

    displayRandomFact();
});