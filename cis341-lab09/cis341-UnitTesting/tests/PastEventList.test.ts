import { it, expect, describe } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import PastEventList from '~/components/PastEventList.vue';

// Mocking the useApiService composable with mockNuxtImport.
mockNuxtImport('useApiService', () => {
  return () => {
    return {
      getEvents: async () => { }, // Simulated API method
      eventList: [
        {
          id: 1,
          name: "Tech Conference 2024",
          date: "2024-05-20T09:00:00Z",
          location: "San Francisco, CA",
          attendees: 53,
        },
        {
          id: 2,
          name: "Music Festival",
          date: "2024-06-15T12:00:00Z",
          location: "Los Angeles, CA",
          attendees: 5032,
        },
      ]
    }
  }
})


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
    expect(listItems.length).toBe(2);

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

