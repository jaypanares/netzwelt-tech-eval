import { arrayToTree } from 'performant-array-to-tree';
import { map } from 'rxjs';

import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { TerritoryNode } from '../services/models';
import { TerritoriesService } from '../services/territories/territories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  treeControl = new NestedTreeControl<TerritoryNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TerritoryNode>();
  hasChild = (_: number, node: TerritoryNode) =>
    !!node.children && node.children.length > 0;

  territories$ = this.territoriesService.getTerritories().pipe(
    map(
      ({ data }) =>
        arrayToTree(data, {
          parentId: 'parent',
          dataField: null,
        }) as TerritoryNode[]
    )
  );

  constructor(private territoriesService: TerritoriesService) {
    this.territories$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => (this.dataSource.data = data));
  }
}
