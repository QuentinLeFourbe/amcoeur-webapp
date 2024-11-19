import type { Meta, StoryObj } from "@storybook/react";

import Table from "./Table";

const meta: Meta<typeof Table> = {
  component: Table,
};
export default meta;

type Story = StoryObj<typeof Table>;

const TableExample = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
          <th>Header 4</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Contenu 1</td>
          <td>Contenu 2</td>
          <td>Contenu 3</td>
          <td>Contenu 4</td>
          <td>Contenu 5</td>
          <td>Contenu 6</td>
        </tr>
        <tr>
          <td>Contenu 7</td>
          <td>Contenu 8</td>
          <td>Contenu 9</td>
          <td>Contenu 10</td>
          <td>Contenu 11</td>
          <td>Contenu 12</td>
        </tr>
        <tr>
          <td>Contenu 13</td>
          <td>Contenu 14</td>
          <td>Contenu 15</td>
          <td>Contenu 16</td>
          <td>Contenu 17</td>
          <td>Contenu 18</td>
        </tr>
        <tr>
          <td>Contenu 19</td>
          <td>Contenu 20</td>
          <td>Contenu 21</td>
          <td>Contenu 22</td>
          <td>Contenu 23</td>
          <td>Contenu 24</td>
        </tr>
        <tr>
          <td>Contenu 25</td>
          <td>Contenu 26</td>
          <td>Contenu 27</td>
          <td>Contenu 28</td>
          <td>Contenu 29</td>
          <td>Contenu 30</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const Base: Story = {
  render: () => <TableExample/>
}
