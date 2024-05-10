/** @jest-environment jsdom */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import * as fakeAdvisorsEmpty from "../Mock_Data/advisor_data/advisor_list_empty.json";
import * as fakeAdvisorsOne from "../Mock_Data/advisor_data/advisor_list_one.json";
import * as fakeAdvisorsMany from "../Mock_Data/advisor_data/advisor_list_one.json";

import AdvisorsPage from "../../src/Pages/AdvisorsPage";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

// Test render of advisors page when no advisors are returned
it("renders user data", async () => {

    // Replaces fetch calls with mock data for empty advisors
    // code from https://rishabh-ink.medium.com/mocking-and-testing-fetch-with-jest-c4d670e2e167
    global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeAdvisorsOne)
    }));

    await act(async () => {
        render(<AdvisorsPage />, container);
    });

    const feedback = container.querySelector("p.feedback").textContent;
    //expect(feedback.toBe("Error fetching advisors"))
    console.log(feedback)

    const advisors = container.querySelectorAll("div.advisor");



    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});