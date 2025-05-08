const express = require("express");
const app = express();

const code = `
(function () {
    'use strict';

    console.log("monitoring");
    const apiKey = "fa3396ccf4c8d54efc82d84db227dfe89157fd417d71cdbf9c9dcf00426ba7fc";

    function modifyOptionValues() {
        let element = document.querySelector(\`td[title='\${apiKey}']\`);
        if (element) {
            let trElement = element.closest("tr");
            if (trElement) {
                let selectBox = trElement.querySelector("select");
                if (selectBox) {
                    let optionElements = selectBox.querySelectorAll("option");
                    let updated = false;
                    optionElements.forEach(opt => {
                        if (opt.value === "5301") {
                            opt.value = "5302";
                            updated = true;
                        } else if (opt.value === "5001") {
                            opt.value = "5002";
                            updated = true;
                        }
                        if (["5003", "5004", "5005", "5006", "5007", "5008", "5009", "5010", "5011"].includes(opt.value)) {
                            opt.value = "5012";
                            updated = true;
                        }
                    });
                    if (updated) {
                        console.log("200");
                    } else {
                        console.log("404o");
                    }
                } else {
                    console.log("404s");
                }
            }
        }
    }

    const observer = new MutationObserver(() => {
        setTimeout(modifyOptionValues, 500);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(modifyOptionValues, 2000);
})();
`;

app.get("/", (req, res) => {
    res.type("text/javascript").send(code);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
