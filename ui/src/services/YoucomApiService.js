import $api from "@/http";

export default class YoucomApiService{
    static async solveCardTask(task, email){
        return $api.get(`/solve-card-task`, { params: {
            task: task,
            email: email,
        }});
    }

    static async summarizeCardDescription(text, email){
        return $api.get(`/summarize-card-description`, { params: {
            text: text,
            email: email,
        }});
    }
}