<template>
    <div>
        <start-navigation></start-navigation>
        <v-container>
            <div class="mt-4 d-flex flex-row">
                <v-card elevation="24" class="mr-4">
                    <div class="d-flex flex-column">
                        <div class="ma-4 pa-4" style="width: 400px; background: #823de1; color: #ffffff; border-radius: 20px; font-size: 20px;">
                            A kanban board is one of the most popular tools that can be used to implement kanban to manage work at a personal or organizational level.
                            <br>
                            <span style="font-weight: 700; font-size: 24px;">
                                Brello can be used for personal organization, such as managing household chores or tracking personal goals.
                            </span>
                        </div>
                        <div class="ma-4" style="margin-top: auto;">
                            <v-btn
                                color="#6200EA"
                                class="btn"
                                @click="signup"
                                block
                            >
                                Sign up for free
                            </v-btn>
                        </div>
                    </div>
                </v-card>
                
                <v-stepper v-model="e1" style="width: 100%;" elevation="24">
                    <v-stepper-header>
                        <v-stepper-step
                            :complete="e1 > 1"
                            step="1"
                            color="#6200ea"
                        >
                            Create workspaces
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                            :complete="e1 > 2"
                            step="2"
                            color="#6200ea"
                        >
                            Add boards
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3" color="#6200ea">
                            Manage cards
                        </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card
                                class="mb-12 pa-4 stepper-text"
                                color="#999999"
                                height="200px"
                                style="color: #ffffff;"
                            >
                                A workspace is an additional abstraction that allows you to contain several kanban boards. In this way, the workspace can be represented as a project, and the kanban boards will then serve as individual parts of that project. For example, when renovating an apartment, the workspace can be the apartment itself, and the kanban boards can be the rooms of that apartment.
                            </v-card>

                            <v-btn
                                color="#6200ea"
                                class="btn"
                                @click="e1 = 2">
                                Continue
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-card
                                class="mb-12 pa-4 stepper-text"
                                color="#999999"
                                height="200px"
                            >
                                A Kanban board is a visualization tool used in project management to visualize work in progress and help users focus on completing a task or project. The board is usually divided into columns that represent different stages of the workflow, such as "To-Do," "In Progress," and "Done." Tasks or work items are represented by cards, which are moved along the board as they progress through the workflow.
                            </v-card>

                            <v-btn
                                color="#6200ea"
                                class="btn"
                                @click="e1 = 3">
                                Continue
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <v-card
                                class="mb-12 pa-4 stepper-text"
                                color="#999999"
                                height="200px"
                            >
                            The task of a card in a Kanban board is to represent a single work item or task that needs to be completed within the workflow.Cards are used to track progress and provide a visual representation of the work that needs to be done. Work items are added to the board via the creation of new cards, and then moved across the board's columns as their status changes.
                            </v-card>

                            <v-btn
                                color="#6200ea"
                                class="btn"
                                @click="e1 = 1">
                                Continue
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </div>
            <v-carousel
                cycle
                light
                class="mt-8 mb-8"
                style="border: solid #999999; border-radius: 20px"
                show-arrows-on-hover>
                <v-carousel-item
                v-for="(item,i) in photos"
                :key="i"
                :src="item.src"
                ></v-carousel-item>
            </v-carousel>
            

            <div>
                <v-card class="pa-4 timeline-text" elevation="10" color="#823de1">
                    Anyone can use a Kanban board for personal organization, whether it's for managing household chores, tracking personal goals, or simply staying on top of tasks and to-do lists. Kanban boards can be customized to fit individual needs and preferences, making them ideal for personal use. They can help individuals to prioritize tasks, track progress, and ensure that nothing falls through the cracks. With the help of a Kanban board, it's possible to stay organized, focused, and productive, no matter what the task at hand may be.
                </v-card>
            </div>
            <v-timeline
                align-top
                :dense="$vuetify.breakpoint.smAndDown"
            >
                <v-timeline-item
                v-for="(item, i) in timelineItems"
                :key="i"
                :color="item.color"
                fill-dot
                >
                    <v-card
                        :color="item.color"
                        dark
                        elevation="10"
                        class="pa-4 timeline-text"
                    >
                        {{ item.text }}
                    </v-card>
                </v-timeline-item>
            </v-timeline>
            <div>
                <v-card class="pa-4 timeline-text" elevation="10" color="teal darken-3">
                    Thus, a Kanban board can be customized to fit anyone's specific needs and preferences, making it a useful tool for improving efficiency and productivity in their daily lives. Whether it's for managing household chores, maintaining a personal to-do list, or tracking progress on personal goals, a Kanban board can help individuals to prioritize tasks, track progress, and ensure that nothing falls through the cracks. Individuals can create a board with columns for different categories of tasks or stages of their projects, and use cards to represent individual tasks or steps. By using a Kanban board to manage their responsibilities, individuals can stay focused and organized, which can ultimately help them to achieve their goals more effectively.
                </v-card>
            </div>
            
        </v-container>
        <v-footer
            class="mt-8"
            color="#6200ea"
            >
            <v-card
                flat
                tile
                width="100%"
                class="text-center"
                color="#6200ea"
            >
                <v-card-text>
                    <v-btn
                        class="mx-4 btn"
                        icon
                    >
                        <a href="https://www.instagram.com/" style="height: 100%; width: 100%;">
                            <img src="@/assets/icons/inst.png" height="20px" width="20px">
                        </a>
                    </v-btn>
                    
                    <v-btn
                        class="mx-4 btn"
                        icon
                    >
                        <a href="https://twitter.com/" style="height: 100%; width: 100%;">
                            <img src="@/assets/icons/twit.png" height="20px" width="20px">
                        </a>
                    </v-btn>
                    <v-btn
                        class="mx-4 btn"
                        icon
                    >  
                        <a href="https://www.facebook.com/" style="height: 100%; width: 100%;">
                            <img src="@/assets/icons/facebook.png" height="20px" width="20px">
                        </a>
                    </v-btn>
                    <v-btn
                        class="mx-4 btn"
                        icon
                    >   
                        <a href="https://www.gmail.com/" style="height: 100%; width: 100%;">
                            <img src="@/assets/icons/email.png" height="20px" width="20px">
                        </a>
                    </v-btn>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    <strong>Brello</strong> - {{ new Date().getFullYear() }}
                </v-card-text>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
import StartNavigation from '@/components/StartNavigation.vue';

    export default {
        name: "start-page",

        components: {
            StartNavigation
        },

        data: () => ({
            e1: 1,
            photos: [
                {
                    src: 'http://localhost:3000/storage/workspaces.png',
                },
                {
                    src: 'http://localhost:3000/storage/boards.png',
                },
                {
                    src: 'http://localhost:3000/storage/cards.png',
                },
            ],
            timelineItems: [
                {
                    color: 'red darken-1',
                    text: 'Freelancers or self-employed individuals: Freelancers or self-employed individuals typically juggle multiple projects and tasks for different clients. A Kanban board can help them to manage these projects, track deadlines, and visualize their workload. They can create a board with columns for different clients or projects, and use cards to represent individual tasks or deliverables. They can also add notes, due dates, or tags to cards to provide additional context or information.',
                },
                {
                    color: 'purple darken-1',
                    text: 'Students can use a Kanban board to organize their academic responsibilities, extracurricular activities, and personal life. They can create a board with columns for different classes or assignments, and use cards to represent individual tasks. They can add due dates, course notes, or links to resources to the cards to make it easier to stay on top of their studies.',
                },
                {
                    color: 'green darken-1',
                    text: `Parents are often faced with a long list of household tasks, children's schedules, and personal appointments. A Kanban board can help them to manage their responsibilities and stay organized. They can create a board with columns for different categories of tasks, such as "Home," "Children," and "Personal," and use cards to represent individual tasks or events. They can also add reminders, due dates, or other notes to the cards to make it easier to remember everything.`,
                },
                {
                    color: 'indigo',
                    text: 'People who have health goals, such as losing weight or building muscle, can use a Kanban board to track their progress and stay motivated. They can create a board with columns for different aspects of their health journey, such as "Exercise," "Diet," and "Self-care," and use cards to represent individual goals or milestones. They can also add notes, progress photos, or links to helpful resources to their cards.',
                },
                {
                    color: 'orange darken-1',
                    text: 'People who enjoy pursuing hobbies or side hustles can use a Kanban board to manage their projects and goals more effectively. They can create a board with columns for different stages of their projects, such as "Ideation," "Planning," and "Execution," and use cards to represent individual tasks or steps. They can also add notes, deadlines, or links to resources to their cards to make it easier to stay on track.',
                },
            ],
            footerIcons: [
                '@/assets/icons/inst.png',
                'mdi-email',
                'mdi-calendar',
                'mdi-delete',
            ],
        }),

        methods: {
            signup(){
                this.$router.push('/registration')
            }
        },
    };
</script>

<style scoped>
.btn{
  color: white!important;
}
.btn:hover{
    background-color: #d1b5f8!important;
}
.stepper-text{
    color: #ffffff;
    font-size: 20px;
    border-radius: 20px;
}
.timeline-text{
    color: #ffffff;
    font-size: 20px;
}
</style>