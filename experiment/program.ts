import {hello} from "../library/library";

const root = document.querySelector(".root") as HTMLElement;
root.innerText = "Hello " + hello();