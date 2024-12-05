// import { it, expect, describe } from 'vitest'
// import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
// import PastEventList from '~/components/PastEventList.vue';

// // Mocking the useGetUsers composable with mockNuxtImport.
// // Nuxt Test Utils is so horribly documented that I had to Google examples
// // of how to specify the return values.
// mockNuxtImport('useApiService', () => {
//   return () => {
//     return {
//         getEvents: async () => {},
//         events: [
//           {
//             id: 1,
//             name: 'Tech Conference 2024',
//             date: '2024-05-20T09:00:00Z',
//             location: 'San Francisco, CA',
//           },
//           {
//             id: 2,
//             name: 'Music Festival',
//             date: '2024-06-15T12:00:00Z',
//             location: 'Los Angeles, CA',
//           },
//           {
//             id: 3,
//             name: 'Art Expo 2024',
//             date: '2024-07-01T10:00:00Z',
//             location: 'New York, NY',
//           }
//         ]
//     }
//   }
// })

// describe("PastEventList", () => {
//     // Smoke test -- does the component mount without errors?
//     it("Can mount the component", async () => {
//         const component = await mountSuspended(PastEventList);
//         // Assert that the component is visible.
//         expect(component.isVisible()).toBe(true);
//     });

//     it("Output contains a list with three list items", async () => {
//         // Act
//         const component = await mountSuspended(PastEventList);
 
//         // Assert
//         // For the Vue Test Utils API to use here, see https://v1.test-utils.vuejs.org/api/wrapper/
//         // Select unordered list and assert that it exists.
//         const ul = component.find('ul');
//         expect(ul.exists()).toBe(true);

//         // Select list items and assert that there are three of them.
//         const listItems = ul.findAll('li');
//         expect(listItems.length).toBe(3);
//     });
// })

import { it, expect, describe } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import PastEventList from '~/components/PastEventList.vue';

mockNuxtImport('useApiService', () => {
  return () => {
    return {
      getEvents: async () => {}, // Simulated API method
      eventList: [
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
    await nextTick();
    expect(component.isVisible()).toBe(true);
  });

  it("Output contains a list with 2 list items", async () => {
    const component = await mountSuspended(PastEventList);
    await nextTick();
    const ul = component.find('ul');
    expect(ul.exists()).toBe(true);
    const listItems = ul.findAll('li');
    expect(listItems.length).toBe(2);
  });
});
