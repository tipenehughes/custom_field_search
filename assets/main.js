// Initialise Apps framework client. See also:
// https://developer.zendesk.com/apps/docs/developer-guide/getting_started
var client = ZAFClient.init();
client.invoke("resize", { width: "100%", height: "200px" });

const getCustomField = async () => {
    // Grabs custom field value - replace the {id} placeholder with your custom field ID
    const customFieldData = await client.get(
        "ticket.customField:custom_field_{id}"
    );
    const customFieldValue =
        customFieldData["ticket.customField:custom_field_{id}"];

    // Request using the custom field value to query via Search API
    const settings = {
        url: `/api/v2/search.json?query=fieldValue:${customFieldValue}`,
        type: "GET",
        dataType: "json",
    };
    const matchingTickets = await client.request(settings);

    // Return array of tickets with matching custom ticket fields
    return matchingTickets.results;
};

getCustomField();
