

// BEGIN NAV CODE
enterPointsButton = document.querySelector("#enter-points")
categoryEntryButton = document.querySelector("#category-entry")
friendsButton = document.querySelector("#Friends")
graphsButton = document.querySelector("#graphs")

const navList = [enterPointsButton, categoryEntryButton, friendsButton, graphsButton]
// navList.forEach(item => {
//     console.log(item.id)
// })

enterPointsSection = document.querySelector(".enter-points")
categoryEntrySection = document.querySelector(".category-entry")
friendsSection = document.querySelector(".Friends")
graphsSection = document.querySelector(".graphs")

const appSections = [enterPointsSection, categoryEntrySection, friendsSection, graphsSection]

const onNavClick = function (event) {
    appSections.forEach(item => {
        if (item.classList[0] !== this.id) {
            item.style.display = "none"
        } else {
            item.style.display = "grid"

        }
    })
}

enterPointsButton.addEventListener("click", onNavClick)
categoryEntryButton.addEventListener("click", onNavClick)
friendsButton.addEventListener("click", onNavClick)
graphsSection.addEventListener("click", onNavClick)



// END NAV CODE





// This class creates a category object!

class PointCategory {
    constructor(
        name
    ){
        this.name = name;
        this.rules = {

        }
    }
}

class RuleObject {
    constructor(
        name,
        pointsPer,
        currentPoints,
        category
    ){
        this.name = name;
        this.pointsPer = pointsPer;
        this.currentPoints = currentPoints;
        this.category = category
    }
}



// Here I'm defining default categories by using the PointCategory class and passing names as arguements
const exercise = new PointCategory("Exercise")
const culture = new PointCategory("Culture")
const skills = new PointCategory("Skills")
const projects = new PointCategory("Projects")
const chores = new PointCategory("Chores")
const penalties = new PointCategory("Penalties")


// Here I'm making an array of the default category objects:
// mainCatList = [exercise, culture, skills, projects, chores, penalties]
mainCatList = [];

const rule1 = new RuleObject("Miles Run", 50, 0, "Exercise")
const rule2 = new RuleObject("Books Read", 20, 0, "Reading")

ruleList = [rule1, rule2];


const textElementCreator = function (elementType, elementText) {
    newElement = document.createElement(elementType)
    newElementText = document.createTextNode(elementText)
    newElement.append(newElementText)
    
    return newElement;
}



// Add Content Code --------------------------------------------------------------------------------------



// the getDiv function creates an orphan div element from a PointCategory object and returns it.
const getDiv = function (divItem) {
    parentDiv = document.createElement("div")
    newDiv = textElementCreator("h1", divItem.name);
    parentDiv.classList.add("item")
    //this creates the close button and prepends it
    closeButton = textElementCreator("div", "x")
    closeButton.classList.add("close-button")
    parentDiv.append(newDiv)
    parentDiv.append(closeButton)

    return parentDiv
}


// the makeDivList function takes the main Category List and creates a new array of orphan div items using the getDiv function
const makeDivList = function (mainCatList) {
    container = document.querySelector(".container")
    divList = [];
    mainCatList.forEach(item => {
        newDiv = getDiv(item);
        divList.push(newDiv)
    }
    );
    return divList
}


const minimizeFunction = function (item) {
    console.log(this)
}


//makes the rule cell out of the rule information
const ruleCell = function (ruleObject) {
    let ruleName = ruleObject.name;
    let rulePointsPer = ruleObject.pointsPer;
    let ruleCurrentPoints = ruleObject.currentPoints;
    let ruleLine = document.createElement("div")
    ruleLine.classList.add("rule-line")
    let nameDisplay = textElementCreator("span", ruleName)
    let pointsPerDisplay = textElementCreator("span", rulePointsPer)
    let currentPointsDisplay = textElementCreator("span", ruleCurrentPoints)
    ruleLine.append(nameDisplay)
    ruleLine.append(pointsPerDisplay)
    ruleLine.append(currentPointsDisplay)
    ruleListArea.append(ruleLine)

}


//something to build the rule list.
//this is passed into the category view builder and builds the list of rules
const buildRuleList = function () {
    catDiv = document.querySelector(".item-open")
    if (document.querySelector(".rule-list-area") !== null) {
        ruleListArea = document.querySelector(".rule-list-area")
        catDiv.removeChild(ruleListArea)
    }
    ruleListArea = document.createElement("div")
    ruleListArea.classList.add("rule-list-area")
    catDiv.append(ruleListArea)
    ruleList.forEach(item => {
        if (item.category === catDiv.querySelector("h1").innerText){
            ruleCell(item)
        }
    });
}


//this function builds the entire category view once the item is open
const buildCategoryView = function () {
    const catDiv = document.querySelector(".item-open")
    const addRuleButton = textElementCreator("div", "Add New Rule");
    addRuleButton.classList.add("add-new-rule-button")
    catDiv.append(addRuleButton)
    buildRuleList()

    addRuleButton.addEventListener("click", (event) => {
        addRuleButton.style.pointerEvents = "none"
        const wholeForm = document.createElement("form")
        wholeForm.id = "new-rule-form"
        // Name Field
        const newRuleNameLabel = textElementCreator("label", "New Rule Name")
        newRuleNameLabel.for = "new-rule-form-name"
        wholeForm.append(newRuleNameLabel)
        const newRuleNameInput = document.createElement("input")
        newRuleNameInput.id = "new-rule-form-name"
        wholeForm.append(newRuleNameInput)
        // PointsPer Field
        const newRulePointsPerLabel = textElementCreator("label", "New Rule Points Per")
        newRulePointsPerLabel.for = "new-rule-form-points-per"
        wholeForm.append(newRulePointsPerLabel)
        const newRulePointsPerInput = document.createElement("input")
        newRulePointsPerInput.id = "new-rule-form-points-per"
        wholeForm.append(newRulePointsPerInput)
        //Submit
        const newRuleSubmit = document.createElement("input")
        newRuleSubmit.class = "new-rule-submit"
        newRuleSubmit.type = "submit"
        wholeForm.append(newRuleSubmit)
        catDiv.append(wholeForm)

        // Submit button function, passing new Rule to list of new Rules
        newRuleSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            let newRuleName = document.querySelector("#new-rule-form-name").value
            let newRulePointsPer = document.querySelector("#new-rule-form-points-per").value
            let currentPoints = 0
            let categoryElement = document.querySelector(".item-open")
            let category = categoryElement.querySelector("h1").innerText
            const newRuleObject = new RuleObject(newRuleName, newRulePointsPer, currentPoints, category)
            ruleList.push(newRuleObject)
            catDiv.removeChild(wholeForm)
            buildRuleList()
            addRuleButton.style.pointerEvents = "auto"

        })
        
    })
}

//The itemViewToggle function is passed into an event listener in the catListConstructor function.
//It makes the item take up full screen edit mode, and also adds the display elements of that mode.
const itemViewToggle = function (item) {
    if (this.classList[0] === "item") {
        this.classList.remove("item")
        this.classList.add("item-open")
        this.removeEventListener("click", itemViewToggle)

        buildCategoryView()

        const minimizeButton = textElementCreator("div", "minimize")
        minimizeButton.classList.add("minimize-button")
        this.prepend(minimizeButton)
        minimizeButton.addEventListener("click", (event) => {
            this.classList.remove("item-open")
            this.classList.add("item")
            catDivs = makeDivList(mainCatList)
            catListConstructor(catDivs)
        })

    } 
    
};


// The catListConstructor function actually appends divList to the page
const catListConstructor = function (divList) {
    listContainer = document.querySelector(".container");
    listContainer.innerHTML = '';
    divList.forEach(item => {
        listContainer.append(item)
        // this adds the itemViewToggle function, which adds the item view functionality
        item.addEventListener("click", itemViewToggle)
    });
    // It also generates a close button for each, with functionality
    const closeButtonList = document.querySelectorAll(".close-button");
    // I'm defining a button to pass into each close button
    const onCloseButton = function () {
        siblingDiv = this.previousElementSibling;
        text = siblingDiv.innerText;
        mainCatList.forEach(item => {
            if (text === item.name) {
                const index = mainCatList.indexOf(item);
                if (index > -1) { // only splice array when item is found
                    mainCatList.splice(index, 1); // 2nd parameter means remove one item only
                    catDivs = makeDivList(mainCatList)
                    catListConstructor(catDivs)
                  }
            }
        })
    };
    closeButtonList.forEach(closeButton => (
        closeButton.addEventListener("click", onCloseButton)
    ))
}

// catDivs = makeDivList(mainCatList)
// catListConstructor(catDivs)


//Website Loads!!


//This statement assigns a variable name to the newCatButton element
const newCatButton = document.querySelector(".newcatbutton");
const modalContainer = document.querySelector(".modal-wrapper");

newCatButton.addEventListener("click", () => {
    modalContainer.classList.add("show");

})


//This function creates a new object from a name and adds it to the list of categories. It then reruns catDivs and catlistConstructor to make the homepage
const newCatCreator = function (categoryName) {
    const newCat = new PointCategory(categoryName)
    mainCatList.push(newCat)
    catDivs = makeDivList(mainCatList)
    catListConstructor(catDivs)

}

//This function passes the newCatName input element object to the variable newCatForm
const newCatForm = document.querySelector("#newCatNameForm");


//This function executes upon the hitting of the submit button. It clears the homepage, then passes the input from the newCatForm form into the variable "categoryName"
//It then runs the newCatCreator function directly above, repopulating homepage.

newCatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let parentElement = document.querySelector(".container");
    parentElement.innerHTML = '';
    let categoryName = document.querySelector("#newCatName").value;
    // console.log(categoryName);
    newCatCreator(categoryName);
    // next we close the window
    modalContainer.classList.remove("show");
})

categoryEntryButton.addEventListener("click", () => {
    catDivs = makeDivList(mainCatList)
    catListConstructor(catDivs)
})
// End Add Content Code --------------------------------------------------------------------------------------------------------------















// Begin Point Entry Code ------------------------------------------------------

const entryRuleCell = function (ruleObject) {
    let ruleName = ruleObject.name;
    let ruleDiv = document.createElement("div")
    ruleDiv.classList.add("rule-div")
    let nameDisplay = textElementCreator("h1", ruleName)
    ruleDiv.append(nameDisplay)
    ruleListArea.append(ruleDiv)
}


const buildRuleListEntryView = function () {
    catDiv = document.querySelector(".entry-category-element-open")
    if (document.querySelector(".entry-view-rule-area") !== null) {
        ruleListArea = document.querySelector(".entry-view-rule-area")
        ruleListArea.innerHTML = "";
    }
    ruleList.forEach(item => {
        if (item.category === catDiv.querySelector("h1").innerText){
            entryRuleCell(item)
        }
    });
}

const getEntryDiv = function (item) {
    parentDiv = document.createElement("div")
    newDiv = textElementCreator("h1", item.name);
    parentDiv.classList.add("entry-category-element")
    //this creates the close button and prepends it
    parentDiv.append(newDiv)

    return parentDiv
}


const makeEntryDivList = function (list) {
    divList = [];
    mainCatList.forEach(item => {
        newDiv = getEntryDiv(item)
        divList.push(newDiv)
    })

    return divList
}
const createBackButton = function (item) {
    catCloseEntry = textElementCreator("div", "<-")
    catCloseEntry.classList.add("cat-close-entry")
    item.append(catCloseEntry)
    const insideCloseButtonAdd = function (item) {
        console.log(item.srcElement.parentElement)
        pointEntryMainListConstructor()
    }
    catCloseEntry.addEventListener("click", insideCloseButtonAdd)
}

const pointEntryMainListConstructor = function () {
    enterPointsSection.innerHTML = '';
    entryDivs = makeEntryDivList(mainCatList)
    entryDivs.forEach(item => {
        enterPointsSection.append(item) 
    })
    entryDivs.forEach(item => {
        item.addEventListener("click", (event) => {
            if (item.classList[0] === "entry-category-element") {
                console.log("hello")
                createBackButton(item)
                item.classList.remove("entry-category-element")
                item.classList.add("entry-category-element-open")
                otherEntries = document.querySelectorAll(".entry-category-element")
                otherEntries.forEach(entry => {
                    entry.style.display = "none";
                })
                entryViewRuleArea = document.createElement("div")
                console.log(entryViewRuleArea)
                entryViewRuleArea.classList.add("entry-view-rule-area")
                item.append(entryViewRuleArea)
                buildRuleListEntryView()

            }
    })
})
}

enterPointsButton.addEventListener("click", pointEntryMainListConstructor)

// End Point Entry Code ---------------------------------------------------------