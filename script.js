import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(
  function () {
    const today = dayjs().format("dddd, MMMM Do");
    const currentMilitaryHour = Number(dayjs().format("H"));
    let container = $(".container-lg");
    let timeStamp = "AM";

    // current day
    $("#currentDay").text(today);

    function savePlan(timeblock, plan) {
      let savedInLocalStorage = JSON.parse(localStorage.getItem("planner"));
      let planner =
        localStorage.getItem("planner") != null ? savedInLocalStorage : [];
      planner.push({ timeblock, plan });

      localStorage.setItem("planner", JSON.stringify(planner));
    }

    // looping through the hours of 9-5 (in this case 9-17 taking into account miliary time) and appending the HTML for the planner input
    for (let i = 9; i <= 17; i++) {
      if (i >= 12) {
        timeStamp = "PM";
      }
      if (i > 12) {
        if (i === currentMilitaryHour) {
          container.append(` 
          <div id="hour-${i - 8}" data-timeBlock = ${
            i - 12
          } class="row time-block present">
         <div class="col-2 col-md-1 hour text-center py-3">${
           i - 12
         }${timeStamp}</div>
         <textarea class="col-8 col-md-10 description" rows="3"></textarea>
         <button class="btn saveBtn col-2 col-md-1" aria-label="save">
           <i class="fas fa-save" aria-hidden="true"></i>
         </button>
       </div>`);
        } else if (i > currentMilitaryHour) {
          container.append(` 
          <div id="hour-${i - 8}" data-timeBlock = ${
            i - 12
          } class="row time-block future">
         <div class="col-2 col-md-1 hour text-center py-3">${
           i - 12
         }${timeStamp}</div>
         <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
         <button class="btn saveBtn col-2 col-md-1" aria-label="save">
           <i class="fas fa-save" aria-hidden="true"></i>
         </button>
       </div>`);
        } else {
          container.append(` 
          <div id="hour-${i - 8}" data-timeBlock = ${
            i - 12
          } class="row time-block past">
         <div class="col-2 col-md-1 hour text-center py-3">${
           i - 12
         }${timeStamp}</div>
         <textarea class="col-8 col-md-10 description" rows="3"></textarea>
         <button class="btn saveBtn col-2 col-md-1" aria-label="save">
           <i class="fas fa-save" aria-hidden="true"></i>
         </button>
       </div>`);
        }
      } else {
        if (i === currentMilitaryHour) {
          container.append(` 
               <div id="hour-${
                 i - 8
               }" data-timeBlock = ${i} class="row time-block present">
              <div class="col-2 col-md-1 hour text-center py-3">${i}${timeStamp}</div>
              <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
              <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                <i class="fas fa-save" aria-hidden="true"></i>
              </button>
            </div>`);
        } else if (i > currentMilitaryHour) {
          container.append(` 
          <div id="hour-${
            i - 8
          }" data-timeBlock = ${i} class="row time-block future">
         <div class="col-2 col-md-1 hour text-center py-3">${i}${timeStamp}</div>
         <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
         <button class="btn saveBtn col-2 col-md-1" aria-label="save">
           <i class="fas fa-save" aria-hidden="true"></i>
         </button>
       </div>`);
        } else {
          container.append(` 
          <div id="hour-${
            i - 8
          }" data-timeBlock = ${i} class="row time-block past">
         <div class="col-2 col-md-1 hour text-center py-3">${i}${timeStamp}</div>
         <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
         <button class="btn saveBtn col-2 col-md-1" aria-label="save">
           <i class="fas fa-save" aria-hidden="true"></i>
         </button>
       </div>`);
        }
      }
    }

    // If the planner already exists in localStorage, loop through it and add it to the textarea
    if (JSON.parse(localStorage.getItem("planner"))) {
      JSON.parse(localStorage.getItem("planner")).forEach((plan) => {
        container
          .children(`[data-timeblock =${plan.timeblock} ]`)
          .children(".description")
          .val(plan.plan);
      });
    }

    // looping through the children of the container once its aleady been added to the HTML and adding the function to save the input once the .saveBtn has been pressed
    container.children().each((e) => {
      let each = $(`#hour-${e + 1}`);
      let text = each.children(".description");

      each.children(".saveBtn").on("click", () => {
        savePlan(each.data().timeblock, text.val());
      });
    });
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
);
