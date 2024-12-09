import { it, describe, expect} from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import PastEventList from "~/components/PastEventList.vue";
import { ref } from "vue";

// Mocking the useApiService composable with mockNuxtImport.
  mockNuxtImport("useApiService", () => {
    return () => ({
      getEvents: (async () => ({
        events: ref([
          {
            id: 1,
            name: "Past Event 1",
            date: "2024-05-20T09:00:00Z",
            location: "Location A",
            attendees: 50,
          },
          {
            id: 2,
            name: "Past Event 2",
            date: "2024-05-20T09:00:00Z",
            location: "Location B",
            attendees: 100,
          },
          {
            id: 3,
            name: "Future Event 2",
            date: "2025-05-20T09:00:00Z",
            location: "Location B",
            attendees: 100,
          },
        ]),
        error: null,
      })),
    });
  });

describe("PastEventList", () => {
  // Smoke test -- check if the component mount without errors
  it("Can mount the component", async () => {
    // Act
    // Mount the component and pass dummy data
    const component = await mountSuspended(PastEventList);
    // Assert that the component is visible.
    expect(component.isVisible()).toBe(true);
  });

  it("Output contains a list with 2 items", async () => {
    const component = await mountSuspended(PastEventList);
    // Select unordered list and assert that it exists.
    const ul = component.find('ul');
    expect(ul.exists()).toBe(true);

    // Select list items  and assert that there are two of them.
    const listItems = component.findAll('li');
    expect(listItems.length).toBe(2); // should return 2, despite us mocking 3 events since one of them is of future's

  });

  // Source: https://v1.test-utils.vuejs.org/api/wrapper/findallcomponents.html 
  it("Output contains a list with nuxtlinks", async () => {
    // Act
    // Mount the component and pass dummy data
    const component = await mountSuspended(PastEventList);

    // Select list items 
    const listItems = component.findAll('li');

    // Assert each <li> contains a <NuxtLink>
    listItems.forEach((item) => {
      const nuxtLink = item.findComponent({ name: 'NuxtLink' });
      expect(nuxtLink.exists()).toBe(true);
    });
  });
 });
