import { LightningElement } from 'lwc';

export default class ToDoManager extends LightningElement {
    taskName = "";
    taskDate = null;
    completetask = [];
    incompletetask = [];

    changeHandler(event) {
        let { name, value } = event.target;
        if (name === "taskName") {
            this.taskName = value;
        } else if (name === "taskDate") {
            this.taskDate = value;
        }
    }

    resetHandler(event) {
        this.taskName = "";
        this.taskDate = null;
    }

    addHandler(event) {
        if (!this.taskDate) {
            this.taskDate = new Date().toISOString().slice(0, 10);
        }
        if (this.validateTask()) {
            this.incompletetask = [
                ...this.incompletetask,
                {
                    taskName: this.taskName,
                    taskDate: this.taskDate
                }
            ];
            this.taskName = "";
            this.taskDate = null;
            this.resetHandler();
        }
    }
    

    validateTask() {
        let isValid = true;
        let element = this.template.querySelector(".taskname");
        if (!this.taskName) {
            isValid = false;
            element.setCustomValidity("Task name cannot be empty");
        } else {
            let taskItem = this.incompletetask.find(currItem =>
                currItem.taskName === this.taskName &&
                currItem.taskDate === this.taskDate
            );
            if (taskItem) {
                isValid = false;
                element.setCustomValidity("Task is already available");
            }
        }
        if (isValid) {
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }

    sortTasks() {
        this.incompletetask.sort((a, b) => {
            const dateA = new Date(a.taskDate);
            const dateB = new Date(b.taskDate);
            return dateA - dateB;
        });
    }

    removeHandler(event) {
        let index = event.target.dataset.index;
        console.log("Index to be removed:", index); // Add this line for debugging
        this.incompletetask.splice(index, 1);
        this.sortTasks();
    }
    

    completeHandler(event) {
        let index = event.target.dataset.index;
        let removeItem = this.incompletetask.splice(index, 1);
        this.completetask = [...this.completetask, removeItem[0]];
        this.sortTasks();
    }
}
