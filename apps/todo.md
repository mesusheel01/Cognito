# Current todos:

-| Firstly develope the sidebar and make it responsive.
-| Make the add content section to add content from the frontend
-| Load all the recent content on the main page - (main section logic)
-| Make the sidebar section if clicked on a specific button should load content related to it
-| Create the main seciton and preview the all the contents from the backend
-| Encountered some things like type specific designs for contents - Done for youtube basically
-| Will be creating specific section content view for the all other lefts such as twitter, docs, tags links - sorted when I call backend for contents it return back will and and we filter according to with what on button is clicked.
-| Correct addition of contents to the backend and removal of old inavlid contents
-| Make the content refresh after addition of new one.
-| Make the cognito button working
-| Make the live search working ok.
-| Add the password hide and show eye **forgot😁**
-| Add the clickable for sidebar buttons when it is not expanded
-| Implement the design of Ai to search about the content!
-| Content type is diffrent in frontend and backend correct it.
-| Frontend part if done now moving on to backend ai integration.
{
    ***notes-for-ai-implementation***:{
        - Added the AI functionality to include a button in the live Search dialog box on each content and while clicking on the content a input tag will appear and you can search anything about the content like if its a video get brief info of it.
            -| First get the API key to use it to connect to a llm.
            -| Design the button thing on each content in the dialog box.
            -|  Implement the onclick handler on the frontend
            -| Implemented the ai utility for every content
            - Test the ai utility for every proper content and correct if its wrong
    }
    ***issues-during-implementation*** :{
        - Request limit error aa gya phle content k sath request hit marne pr
        - Twitter api rate limit per day
    }
}
-| Create the backend route for getting the ai response and test it with postman
-| Yeah! achievement got the ai response in the first hit, so happy
-| lets go integrate it to frontend.
-| Make a div which when response is avalable then it will appear below the content otherwise it will show loading state
-| Improved the AiSearch response view
-| Improved the sidebar functionality and added a logout button.
- Implement the notistack for notifications on every action.

