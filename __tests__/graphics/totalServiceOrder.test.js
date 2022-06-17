describe("Test the total service order module", () => {

    test("Should return a client service orders", () => {
        let client = { id: 0 } // Select the client
        let ServiceOrder = Object(); // Instance ServiceOrder object
        res = ServiceOrder.getOrders(client);
        let ids = [];
        for(let i in res) {
            if(!ids.includes(res[i].client.id)){
                ids.push(res[i].client.id);
            }
        }
        expect(ids.length).toBe(1);
        expect(ids[0]).toBe(client.id);
    });

    test("Should return clients orders between a period", () => {
        let client = { id: 0 }
        let start_date = new Date("2022-01-01");
        let end_date = new Date("2022-06-01");
        let ServiceOrder = Object();
        res = ServiceOrder.getOrdersByPeriod(client, start_date, end_date);
        let s_date, e_date;
        let valid = true;
        for(let i in res) {
            s_date = new Date(res[i].createdAt);
            e_date = new Date(res[i].finishedAt);
            if(s_date < start_date || e_date > end_date) {
                valid = false;
                break;
            }
        }
        expect(valid).toBe(true);
    });
})