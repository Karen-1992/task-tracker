import httpService from "./http.service";

const taskEndpoint = "task/";

const taskService = {
    get: async ({ userId }) => {
        const { data } = await httpService.get(taskEndpoint, {
            params: {
                orderBy: "userId",
                equalTo: `${userId}`
            }
        });
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(taskEndpoint, payload);
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(taskEndpoint + payload);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            taskEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default taskService;
