import { it, expect, describe } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import PastEventList from '~/components/PastEventList.vue';

mockNuxtImport('useApiService', () => {
  return () => {
    return {
      getEvents: async () => {}, // Simulated API method
      events: [
        {
          id: 1,
          name: 'Tech Conference 2024',
          date: '2024-05-20T09:00:00Z',
          location: 'San Francisco, CA',
          description: 'Unit test for tech-conference',
          owner_id: 1,
          type_id: 1,
          attendees: 53,
          price: 500
        },
        {
          id: 2,
          name: 'Music Festival',
          date: '2024-06-15T12:00:00Z',
          location: 'Los Angeles, CA',
          description: 'Unit test for music festival',
          owner_id: 2,
          type_id: 2,
          attendees: 5032,
          price: 25
        },
      ],
    };
  };
});


describe("PastEventList", () => {
  it("Can mount the component", async () => {
    const component = await mountSuspended(PastEventList);

    expect(component.isVisible()).toBe(true);
  });

  it("Output contains a ul list", async () => {
    const component = await mountSuspended(PastEventList);

    const ul = component.find('ul');
    expect(ul.exists()).toBe(true);
    
  });

  it("Output contains a list with 2 list items", async () => {
    const component = await mountSuspended(PastEventList);

    const ul = component.find('ul');
    
    const listItems = ul.findAll('li');
    expect(listItems.length).toBe(2);
  });


});
