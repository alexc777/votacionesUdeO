import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { AuthService } from "../../../services/auth.service";
import { GraficasService } from "../../../services/graficas.service";
import { VotosService } from "../../../services/votos.service";
import { ProyectoService } from "../../../services/proyecto.service";
import { observable } from "rxjs";
import { Subject } from "rxjs/";
import { takeUntil } from "rxjs/operators";
import * as _ from "lodash";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [GraficasService]
})
export class DashboardComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Robots" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Van de Graff" },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: "Motores" }
  ];
  proyectos: Array<any>;
  public lineChartLabels: Label[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio"
  ];
  data: any;
  dataGrafica: any;
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left"
        },
        {
          id: "y-axis-1",
          position: "right",
          gridLines: {
            color: "rgba(255,0,0,0.3)"
          },
          ticks: {
            fontColor: "red"
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno"
          }
        }
      ]
    }
  };

  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // dark grey
      backgroundColor: "rgba(77,83,96,0.2)",
      borderColor: "rgba(77,83,96,1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    },
    {
      // red
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "red",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];

  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {}) chart: BaseChartDirective;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top"
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    }
  };

  public pieChartLabels: Label[] = [
    ["Motores"],
    ["Van de Graff"],
    "Exploradores"
  ];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        "rgba(255,0,0,0.3)",
        "rgba(0,255,0,0.3)",
        "rgba(0,0,255,0.3)"
      ]
    }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    }
  };

  public barChartLabels: Label[] = [""];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [{ data: [0], label: "" }];

  ngOnInit() {
    this.dataGrafica = {};
    this.dataGrafica.labels = ["Votaciones"];
    this.dataGrafica.datasets = [];
    this.data = {};
    /*this.data = {
      labels: ['January'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
          label: 'My First datasetsdasdsadasd',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }*/

    this.graficaService
      .getVotosGenerales()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(votos => {
        this.barChartData = [{ data: [0], label: "" }];
        this.proyectoService
          .getProyectos()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(result => {
            this.proyectos = result;
            //console.log(this.proyectos);
            console.log(votos);
            this.proyectos.forEach(proyecto => {
              //console.log(proyecto);
              proyecto.total = 0;
              votos.forEach(voto => {
                if (proyecto.id == voto.idProyecto) {
                  proyecto.total = +proyecto.total + voto.valor;
                  console.log(proyecto.total);
                }
              });
              let data: any = {};

              data.label = proyecto.nombre;
              data.backgroundColor = "#42A5F5";
              data.borderColor = "#1E88E5";
              data.data = [proyecto.total];
              let databar: any = {};
              databar.data = [proyecto.total];
              databar.label = proyecto.nombre;
              databar.backgroundColor = [
                "#" + ((Math.random() * 0xffffff) << 0).toString(16)
              ];
              this.barChartData.push(databar);
              this.dataGrafica.datasets.push(data);
              //{ data: [65], label: 'Robotssdas' },
            });
            console.log(this.dataGrafica);
            //this.data = new Object();
            //this.data = this.dataGrafica;
          });
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  constructor(
    private graficaService: GraficasService,
    private proyectoService: ProyectoService,
    private votosService: VotosService
  ) {}

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
