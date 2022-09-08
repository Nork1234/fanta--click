var game = {
            score: 0,
            totalScore: 0,
            totalClicks: 0,
            clickValue: 1,
            version: 1.000,

            addToScore: function(amount) {
                this.score += amount;
                this.totalScore += amount;
                display.updateScore();
            },

            getScorePerSecond: function() {
                var scorePerSecond = 0;
                for (i = 0; i < building.name.length; i++) {
                    scorePerSecond += building.income[i] * building.count[i];
                }
                return scorePerSecond;
            }
        };

        var building = {
            name: [
                "Cursor",
                "Oranges",
                "Vending machine",
                "Homemade Fanta",
                "Fanta River",
                "Fanta Factory",
                "Bank",
                "Fanta Museum",
                "3D Printer",
                "Fanta Blaster",
                "Clone Machine",
                "Portal",
                "Time Machine",
                "Inspect Console",
                "Fanta God"
            ],
            image: [
                "cursor.png",
                "orange.png",
                "vending.png",
                "homemade.png",
                "river.png",
                "factory.png",
                "bank.png",
                "museum.png",
                "printer.png",
                "blaster.png",
                "Cloning_Machine.png",
                "portal.png",
                "time.png",
                "console.png",
                "god.png"
            ],
            count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            income: [
                1,
                10,
                70,
                120,
                200,
                400,
                500,
                10000,
                20000,
                50000,
                100000,
                500000,
                1000000,
                2000000,
                3000000
            ],
            cost: [
                15,
                100,
                1000,
                5000,
                10000,
                20000,
                30000,
                40000,
                50000,
                100000,
                200000,
                500000,
                1000000,
                2000000,
                5000000

            ],

        purchase: function(index) {
            if (game.score >= this.cost[index]) {
                game.score -= this.cost[index];
                this.count[index]++;
                this.cost[index] = Math.ceil(this.cost[index] * 1.10);
                display.updateScore();
                display.updateShop();
            }
        }

        };

        var display = {
            updateScore: function() {
                document.getElementById("score").innerHTML = game.score;
                document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
                document.title = game.score + " fanta - Fanta Clicker";
            },

            updateShop: function() {
                document.getElementById("shopContainer").innerHTML = "";
                for (i = 0; i < building.name.length; i++) {
                    document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img src="images/'+building.image[i]+'"></td><td id="nameAndCost"> <p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> fantas</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
                }
            }
        };

        function saveGame() {
            var gameSave = {
                score: game.score,
                totalScore: game.totalScore,
                totalClicks: game.totalClicks,
                clickValue: game.clickValue,
                version: game.version,
                buildingCount: building.count,
                buildingIncome: building.income,
                buildingCost: building.cost
            };
            localStorage.setItem("gameSave", JSON.stringify(gameSave));
        }

        function loadGame() {
            var savedGame =  JSON.parse(localStorage.getItem("gameSave"));
            if(localStorage.getItem("gameSave") !== null) {
                if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
                if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
                if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
                if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
                if (typeof savedGame.buildingCount !== "undefined") {
                    for (i = 0; i < savedGame.buildingCount.length; i++) {
                        building.count[i] = savedGame.buildingCount[i];
                    }
                }

                if (typeof savedGame.buildingCount !== "undefined") {
                    for (i = 0; i < savedGame.buildingCount.length; i++) {
                        building.count[i] = savedGame.buildingCount[i];
                    }
                }

                if (typeof savedGame.buildingIncome !== "undefined") {
                    for (i = 0; i < savedGame.buildingIncome.length; i++) {
                        building.income[i] = savedGame.buildingIncome[i];
                    }
                }
                
                if (typeof savedGame.buildingCost !== "undefined") {
                    for (i = 0; i < savedGame.buildingCost.length; i++) {
                        building.cost[i] = savedGame.buildingCost[i];
                    }
                }
            }
        }

        function resetGame() {
            if (confirm("Are you sure you want to reset your game?")) {
                var gameSave = {};
                localStorage.setItem("gameSave", JSON.stringify(gameSave));
                location.reload();
            }
        }

        window.onload = function() {
            loadGame();
            display.updateScore();
            display.updateShop();
        };

        setInterval(function() {
            game.score += game.getScorePerSecond();
            game.totalScore += game.getScorePerSecond();
            display.updateScore();
        }, 1000); // 30000ms = 30 sec

        setInterval(function() {
            saveGame();
        }, 30000); // 30000ms = 30 sec

        document.addEventListener("keydown", function (event) {
            if (event.ctrlKey && event.which == 83) {
                event.preventDefault();
                saveGame();
            }
        }, false);