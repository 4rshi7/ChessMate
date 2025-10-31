import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Statistics
 *
 */
export type StatisticsModel = runtime.Types.Result.DefaultSelection<Prisma.$StatisticsPayload>;
export type AggregateStatistics = {
    _count: StatisticsCountAggregateOutputType | null;
    _avg: StatisticsAvgAggregateOutputType | null;
    _sum: StatisticsSumAggregateOutputType | null;
    _min: StatisticsMinAggregateOutputType | null;
    _max: StatisticsMaxAggregateOutputType | null;
};
export type StatisticsAvgAggregateOutputType = {
    totalGames: number | null;
    wins: number | null;
    losses: number | null;
    draws: number | null;
};
export type StatisticsSumAggregateOutputType = {
    totalGames: number | null;
    wins: number | null;
    losses: number | null;
    draws: number | null;
};
export type StatisticsMinAggregateOutputType = {
    id: string | null;
    totalGames: number | null;
    wins: number | null;
    losses: number | null;
    draws: number | null;
    userId: string | null;
};
export type StatisticsMaxAggregateOutputType = {
    id: string | null;
    totalGames: number | null;
    wins: number | null;
    losses: number | null;
    draws: number | null;
    userId: string | null;
};
export type StatisticsCountAggregateOutputType = {
    id: number;
    totalGames: number;
    wins: number;
    losses: number;
    draws: number;
    userId: number;
    _all: number;
};
export type StatisticsAvgAggregateInputType = {
    totalGames?: true;
    wins?: true;
    losses?: true;
    draws?: true;
};
export type StatisticsSumAggregateInputType = {
    totalGames?: true;
    wins?: true;
    losses?: true;
    draws?: true;
};
export type StatisticsMinAggregateInputType = {
    id?: true;
    totalGames?: true;
    wins?: true;
    losses?: true;
    draws?: true;
    userId?: true;
};
export type StatisticsMaxAggregateInputType = {
    id?: true;
    totalGames?: true;
    wins?: true;
    losses?: true;
    draws?: true;
    userId?: true;
};
export type StatisticsCountAggregateInputType = {
    id?: true;
    totalGames?: true;
    wins?: true;
    losses?: true;
    draws?: true;
    userId?: true;
    _all?: true;
};
export type StatisticsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Statistics to aggregate.
     */
    where?: Prisma.StatisticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Statistics to fetch.
     */
    orderBy?: Prisma.StatisticsOrderByWithRelationInput | Prisma.StatisticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StatisticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Statistics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Statistics
    **/
    _count?: true | StatisticsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StatisticsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StatisticsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StatisticsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StatisticsMaxAggregateInputType;
};
export type GetStatisticsAggregateType<T extends StatisticsAggregateArgs> = {
    [P in keyof T & keyof AggregateStatistics]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStatistics[P]> : Prisma.GetScalarType<T[P], AggregateStatistics[P]>;
};
export type StatisticsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatisticsWhereInput;
    orderBy?: Prisma.StatisticsOrderByWithAggregationInput | Prisma.StatisticsOrderByWithAggregationInput[];
    by: Prisma.StatisticsScalarFieldEnum[] | Prisma.StatisticsScalarFieldEnum;
    having?: Prisma.StatisticsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StatisticsCountAggregateInputType | true;
    _avg?: StatisticsAvgAggregateInputType;
    _sum?: StatisticsSumAggregateInputType;
    _min?: StatisticsMinAggregateInputType;
    _max?: StatisticsMaxAggregateInputType;
};
export type StatisticsGroupByOutputType = {
    id: string;
    totalGames: number;
    wins: number;
    losses: number;
    draws: number;
    userId: string;
    _count: StatisticsCountAggregateOutputType | null;
    _avg: StatisticsAvgAggregateOutputType | null;
    _sum: StatisticsSumAggregateOutputType | null;
    _min: StatisticsMinAggregateOutputType | null;
    _max: StatisticsMaxAggregateOutputType | null;
};
type GetStatisticsGroupByPayload<T extends StatisticsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StatisticsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StatisticsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StatisticsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StatisticsGroupByOutputType[P]>;
}>>;
export type StatisticsWhereInput = {
    AND?: Prisma.StatisticsWhereInput | Prisma.StatisticsWhereInput[];
    OR?: Prisma.StatisticsWhereInput[];
    NOT?: Prisma.StatisticsWhereInput | Prisma.StatisticsWhereInput[];
    id?: Prisma.StringFilter<"Statistics"> | string;
    totalGames?: Prisma.IntFilter<"Statistics"> | number;
    wins?: Prisma.IntFilter<"Statistics"> | number;
    losses?: Prisma.IntFilter<"Statistics"> | number;
    draws?: Prisma.IntFilter<"Statistics"> | number;
    userId?: Prisma.StringFilter<"Statistics"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type StatisticsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    totalGames?: Prisma.SortOrder;
    wins?: Prisma.SortOrder;
    losses?: Prisma.SortOrder;
    draws?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type StatisticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.StatisticsWhereInput | Prisma.StatisticsWhereInput[];
    OR?: Prisma.StatisticsWhereInput[];
    NOT?: Prisma.StatisticsWhereInput | Prisma.StatisticsWhereInput[];
    totalGames?: Prisma.IntFilter<"Statistics"> | number;
    wins?: Prisma.IntFilter<"Statistics"> | number;
    losses?: Prisma.IntFilter<"Statistics"> | number;
    draws?: Prisma.IntFilter<"Statistics"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type StatisticsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    totalGames?: Prisma.SortOrder;
    wins?: Prisma.SortOrder;
    losses?: Prisma.SortOrder;
    draws?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.StatisticsCountOrderByAggregateInput;
    _avg?: Prisma.StatisticsAvgOrderByAggregateInput;
    _max?: Prisma.StatisticsMaxOrderByAggregateInput;
    _min?: Prisma.StatisticsMinOrderByAggregateInput;
    _sum?: Prisma.StatisticsSumOrderByAggregateInput;
};
export type StatisticsScalarWhereWithAggregatesInput = {
    AND?: Prisma.StatisticsScalarWhereWithAggregatesInput | Prisma.StatisticsScalarWhereWithAggregatesInput[];
    OR?: Prisma.StatisticsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StatisticsScalarWhereWithAggregatesInput | Prisma.StatisticsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Statistics"> | string;
    totalGames?: Prisma.IntWithAggregatesFilter<"Statistics"> | number;
    wins?: Prisma.IntWithAggregatesFilter<"Statistics"> | number;
    losses?: Prisma.IntWithAggregatesFilter<"Statistics"> | number;
    draws?: Prisma.IntWithAggregatesFilter<"Statistics"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"Statistics"> | string;
};
export type StatisticsCreateInput = {
    id?: string;
    totalGames?: number;
    wins?: number;
    losses?: number;
    draws?: number;
    user: Prisma.UserCreateNestedOneWithoutStatisticsInput;
};
export type StatisticsUncheckedCreateInput = {
    id?: string;
    totalGames?: number;
    wins?: number;
    losses?: number;
    draws?: number;
    userId: string;
};
export type StatisticsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalGames?: Prisma.IntFieldUpdateOperationsInput | number;
    wins?: Prisma.IntFieldUpdateOperationsInput | number;
    losses?: Prisma.IntFieldUpdateOperationsInput | number;
    draws?: Prisma.IntFieldUpdateOperationsInput | number;
    user?: Prisma.UserUpdateOneRequiredWithoutStatisticsNestedInput;
};
export type StatisticsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalGames?: Prisma.IntFieldUpdateOperationsInput | number;
    wins?: Prisma.IntFieldUpdateOperationsInput | number;
    losses?: Prisma.IntFieldUpdateOperationsInput | number;
    draws?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StatisticsCreateManyInput = {
    id?: string;
    totalGames?: number;
    wins?: number;
    losses?: number;
    draws?: number;
    userId: string;
};
export type StatisticsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalGames?: Prisma.IntFieldUpdateOperationsInput | number;
    wins?: Prisma.IntFieldUpdateOperationsInput | number;
    losses?: Prisma.IntFieldUpdateOperationsInput | number;
    draws?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type StatisticsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalGames?: Prisma.IntFieldUpdateOperationsInput | number;
    wins?: Prisma.IntFieldUpdateOperationsInput | number;
    losses?: Prisma.IntFieldUpdateOperationsInput | number;
    draws?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StatisticsNullableScalarRelationFilter = {
    is?: Prisma.StatisticsWhereInput | null;
    isNot?: Prisma.StatisticsWhereInput | null;
};
export type StatisticsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    totalGames?: Prisma.SortOrder;
    wins?: Prisma.SortOrder;
    losses?: Prisma.SortOrder;
    draws?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type StatisticsAvgOrderByAggregateInput = {
    totalGames?: Prisma.SortOrder;
    wins?: Prisma.SortOrder;
    losses?: Prisma.SortOrder;
    draws?: Prisma.SortOrder;
};
export type StatisticsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    totalGames?: Prisma.SortOrder;
    wins?: Prisma.SortOrder;
    losses?: Prisma.SortOrder;
    draws?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type StatisticsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    totalGames?: Prisma.SortOrder;
    wins?: Prisma.SortOrder;
    losses?: Prisma.SortOrder;
    draws?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type StatisticsSumOrderByAggregateInput = {
    totalGames?: Prisma.SortOrder;
    wins?: Prisma.SortOrder;
    losses?: Prisma.SortOrder;
    draws?: Prisma.SortOrder;
};
export type StatisticsCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StatisticsCreateWithoutUserInput, Prisma.StatisticsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StatisticsCreateOrConnectWithoutUserInput;
    connect?: Prisma.StatisticsWhereUniqueInput;
};
export type StatisticsUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StatisticsCreateWithoutUserInput, Prisma.StatisticsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StatisticsCreateOrConnectWithoutUserInput;
    connect?: Prisma.StatisticsWhereUniqueInput;
};
export type StatisticsUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StatisticsCreateWithoutUserInput, Prisma.StatisticsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StatisticsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StatisticsUpsertWithoutUserInput;
    disconnect?: Prisma.StatisticsWhereInput | boolean;
    delete?: Prisma.StatisticsWhereInput | boolean;
    connect?: Prisma.StatisticsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StatisticsUpdateToOneWithWhereWithoutUserInput, Prisma.StatisticsUpdateWithoutUserInput>, Prisma.StatisticsUncheckedUpdateWithoutUserInput>;
};
export type StatisticsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StatisticsCreateWithoutUserInput, Prisma.StatisticsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StatisticsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StatisticsUpsertWithoutUserInput;
    disconnect?: Prisma.StatisticsWhereInput | boolean;
    delete?: Prisma.StatisticsWhereInput | boolean;
    connect?: Prisma.StatisticsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StatisticsUpdateToOneWithWhereWithoutUserInput, Prisma.StatisticsUpdateWithoutUserInput>, Prisma.StatisticsUncheckedUpdateWithoutUserInput>;
};
export type StatisticsCreateWithoutUserInput = {
    id?: string;
    totalGames?: number;
    wins?: number;
    losses?: number;
    draws?: number;
};
export type StatisticsUncheckedCreateWithoutUserInput = {
    id?: string;
    totalGames?: number;
    wins?: number;
    losses?: number;
    draws?: number;
};
export type StatisticsCreateOrConnectWithoutUserInput = {
    where: Prisma.StatisticsWhereUniqueInput;
    create: Prisma.XOR<Prisma.StatisticsCreateWithoutUserInput, Prisma.StatisticsUncheckedCreateWithoutUserInput>;
};
export type StatisticsUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.StatisticsUpdateWithoutUserInput, Prisma.StatisticsUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StatisticsCreateWithoutUserInput, Prisma.StatisticsUncheckedCreateWithoutUserInput>;
    where?: Prisma.StatisticsWhereInput;
};
export type StatisticsUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.StatisticsWhereInput;
    data: Prisma.XOR<Prisma.StatisticsUpdateWithoutUserInput, Prisma.StatisticsUncheckedUpdateWithoutUserInput>;
};
export type StatisticsUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalGames?: Prisma.IntFieldUpdateOperationsInput | number;
    wins?: Prisma.IntFieldUpdateOperationsInput | number;
    losses?: Prisma.IntFieldUpdateOperationsInput | number;
    draws?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type StatisticsUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalGames?: Prisma.IntFieldUpdateOperationsInput | number;
    wins?: Prisma.IntFieldUpdateOperationsInput | number;
    losses?: Prisma.IntFieldUpdateOperationsInput | number;
    draws?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type StatisticsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    totalGames?: boolean;
    wins?: boolean;
    losses?: boolean;
    draws?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statistics"]>;
export type StatisticsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    totalGames?: boolean;
    wins?: boolean;
    losses?: boolean;
    draws?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statistics"]>;
export type StatisticsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    totalGames?: boolean;
    wins?: boolean;
    losses?: boolean;
    draws?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statistics"]>;
export type StatisticsSelectScalar = {
    id?: boolean;
    totalGames?: boolean;
    wins?: boolean;
    losses?: boolean;
    draws?: boolean;
    userId?: boolean;
};
export type StatisticsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "totalGames" | "wins" | "losses" | "draws" | "userId", ExtArgs["result"]["statistics"]>;
export type StatisticsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StatisticsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StatisticsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $StatisticsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Statistics";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        totalGames: number;
        wins: number;
        losses: number;
        draws: number;
        userId: string;
    }, ExtArgs["result"]["statistics"]>;
    composites: {};
};
export type StatisticsGetPayload<S extends boolean | null | undefined | StatisticsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StatisticsPayload, S>;
export type StatisticsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StatisticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StatisticsCountAggregateInputType | true;
};
export interface StatisticsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Statistics'];
        meta: {
            name: 'Statistics';
        };
    };
    /**
     * Find zero or one Statistics that matches the filter.
     * @param {StatisticsFindUniqueArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatisticsFindUniqueArgs>(args: Prisma.SelectSubset<T, StatisticsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StatisticsClient<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Statistics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatisticsFindUniqueOrThrowArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatisticsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StatisticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StatisticsClient<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Statistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindFirstArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatisticsFindFirstArgs>(args?: Prisma.SelectSubset<T, StatisticsFindFirstArgs<ExtArgs>>): Prisma.Prisma__StatisticsClient<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Statistics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindFirstOrThrowArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatisticsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StatisticsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StatisticsClient<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Statistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Statistics
     * const statistics = await prisma.statistics.findMany()
     *
     * // Get first 10 Statistics
     * const statistics = await prisma.statistics.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const statisticsWithIdOnly = await prisma.statistics.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StatisticsFindManyArgs>(args?: Prisma.SelectSubset<T, StatisticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Statistics.
     * @param {StatisticsCreateArgs} args - Arguments to create a Statistics.
     * @example
     * // Create one Statistics
     * const Statistics = await prisma.statistics.create({
     *   data: {
     *     // ... data to create a Statistics
     *   }
     * })
     *
     */
    create<T extends StatisticsCreateArgs>(args: Prisma.SelectSubset<T, StatisticsCreateArgs<ExtArgs>>): Prisma.Prisma__StatisticsClient<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Statistics.
     * @param {StatisticsCreateManyArgs} args - Arguments to create many Statistics.
     * @example
     * // Create many Statistics
     * const statistics = await prisma.statistics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StatisticsCreateManyArgs>(args?: Prisma.SelectSubset<T, StatisticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Statistics and returns the data saved in the database.
     * @param {StatisticsCreateManyAndReturnArgs} args - Arguments to create many Statistics.
     * @example
     * // Create many Statistics
     * const statistics = await prisma.statistics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Statistics and only return the `id`
     * const statisticsWithIdOnly = await prisma.statistics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StatisticsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StatisticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Statistics.
     * @param {StatisticsDeleteArgs} args - Arguments to delete one Statistics.
     * @example
     * // Delete one Statistics
     * const Statistics = await prisma.statistics.delete({
     *   where: {
     *     // ... filter to delete one Statistics
     *   }
     * })
     *
     */
    delete<T extends StatisticsDeleteArgs>(args: Prisma.SelectSubset<T, StatisticsDeleteArgs<ExtArgs>>): Prisma.Prisma__StatisticsClient<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Statistics.
     * @param {StatisticsUpdateArgs} args - Arguments to update one Statistics.
     * @example
     * // Update one Statistics
     * const statistics = await prisma.statistics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StatisticsUpdateArgs>(args: Prisma.SelectSubset<T, StatisticsUpdateArgs<ExtArgs>>): Prisma.Prisma__StatisticsClient<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Statistics.
     * @param {StatisticsDeleteManyArgs} args - Arguments to filter Statistics to delete.
     * @example
     * // Delete a few Statistics
     * const { count } = await prisma.statistics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StatisticsDeleteManyArgs>(args?: Prisma.SelectSubset<T, StatisticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Statistics
     * const statistics = await prisma.statistics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StatisticsUpdateManyArgs>(args: Prisma.SelectSubset<T, StatisticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Statistics and returns the data updated in the database.
     * @param {StatisticsUpdateManyAndReturnArgs} args - Arguments to update many Statistics.
     * @example
     * // Update many Statistics
     * const statistics = await prisma.statistics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Statistics and only return the `id`
     * const statisticsWithIdOnly = await prisma.statistics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends StatisticsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StatisticsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Statistics.
     * @param {StatisticsUpsertArgs} args - Arguments to update or create a Statistics.
     * @example
     * // Update or create a Statistics
     * const statistics = await prisma.statistics.upsert({
     *   create: {
     *     // ... data to create a Statistics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Statistics we want to update
     *   }
     * })
     */
    upsert<T extends StatisticsUpsertArgs>(args: Prisma.SelectSubset<T, StatisticsUpsertArgs<ExtArgs>>): Prisma.Prisma__StatisticsClient<runtime.Types.Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsCountArgs} args - Arguments to filter Statistics to count.
     * @example
     * // Count the number of Statistics
     * const count = await prisma.statistics.count({
     *   where: {
     *     // ... the filter for the Statistics we want to count
     *   }
     * })
    **/
    count<T extends StatisticsCountArgs>(args?: Prisma.Subset<T, StatisticsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StatisticsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatisticsAggregateArgs>(args: Prisma.Subset<T, StatisticsAggregateArgs>): Prisma.PrismaPromise<GetStatisticsAggregateType<T>>;
    /**
     * Group by Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends StatisticsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StatisticsGroupByArgs['orderBy'];
    } : {
        orderBy?: StatisticsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StatisticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatisticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Statistics model
     */
    readonly fields: StatisticsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Statistics.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StatisticsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Statistics model
 */
export interface StatisticsFieldRefs {
    readonly id: Prisma.FieldRef<"Statistics", 'String'>;
    readonly totalGames: Prisma.FieldRef<"Statistics", 'Int'>;
    readonly wins: Prisma.FieldRef<"Statistics", 'Int'>;
    readonly losses: Prisma.FieldRef<"Statistics", 'Int'>;
    readonly draws: Prisma.FieldRef<"Statistics", 'Int'>;
    readonly userId: Prisma.FieldRef<"Statistics", 'String'>;
}
/**
 * Statistics findUnique
 */
export type StatisticsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where: Prisma.StatisticsWhereUniqueInput;
};
/**
 * Statistics findUniqueOrThrow
 */
export type StatisticsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where: Prisma.StatisticsWhereUniqueInput;
};
/**
 * Statistics findFirst
 */
export type StatisticsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where?: Prisma.StatisticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Statistics to fetch.
     */
    orderBy?: Prisma.StatisticsOrderByWithRelationInput | Prisma.StatisticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Statistics.
     */
    cursor?: Prisma.StatisticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Statistics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Statistics.
     */
    distinct?: Prisma.StatisticsScalarFieldEnum | Prisma.StatisticsScalarFieldEnum[];
};
/**
 * Statistics findFirstOrThrow
 */
export type StatisticsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where?: Prisma.StatisticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Statistics to fetch.
     */
    orderBy?: Prisma.StatisticsOrderByWithRelationInput | Prisma.StatisticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Statistics.
     */
    cursor?: Prisma.StatisticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Statistics.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Statistics.
     */
    distinct?: Prisma.StatisticsScalarFieldEnum | Prisma.StatisticsScalarFieldEnum[];
};
/**
 * Statistics findMany
 */
export type StatisticsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * Filter, which Statistics to fetch.
     */
    where?: Prisma.StatisticsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Statistics to fetch.
     */
    orderBy?: Prisma.StatisticsOrderByWithRelationInput | Prisma.StatisticsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Statistics.
     */
    cursor?: Prisma.StatisticsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Statistics.
     */
    skip?: number;
    distinct?: Prisma.StatisticsScalarFieldEnum | Prisma.StatisticsScalarFieldEnum[];
};
/**
 * Statistics create
 */
export type StatisticsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * The data needed to create a Statistics.
     */
    data: Prisma.XOR<Prisma.StatisticsCreateInput, Prisma.StatisticsUncheckedCreateInput>;
};
/**
 * Statistics createMany
 */
export type StatisticsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Statistics.
     */
    data: Prisma.StatisticsCreateManyInput | Prisma.StatisticsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Statistics createManyAndReturn
 */
export type StatisticsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * The data used to create many Statistics.
     */
    data: Prisma.StatisticsCreateManyInput | Prisma.StatisticsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Statistics update
 */
export type StatisticsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * The data needed to update a Statistics.
     */
    data: Prisma.XOR<Prisma.StatisticsUpdateInput, Prisma.StatisticsUncheckedUpdateInput>;
    /**
     * Choose, which Statistics to update.
     */
    where: Prisma.StatisticsWhereUniqueInput;
};
/**
 * Statistics updateMany
 */
export type StatisticsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Statistics.
     */
    data: Prisma.XOR<Prisma.StatisticsUpdateManyMutationInput, Prisma.StatisticsUncheckedUpdateManyInput>;
    /**
     * Filter which Statistics to update
     */
    where?: Prisma.StatisticsWhereInput;
    /**
     * Limit how many Statistics to update.
     */
    limit?: number;
};
/**
 * Statistics updateManyAndReturn
 */
export type StatisticsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * The data used to update Statistics.
     */
    data: Prisma.XOR<Prisma.StatisticsUpdateManyMutationInput, Prisma.StatisticsUncheckedUpdateManyInput>;
    /**
     * Filter which Statistics to update
     */
    where?: Prisma.StatisticsWhereInput;
    /**
     * Limit how many Statistics to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Statistics upsert
 */
export type StatisticsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * The filter to search for the Statistics to update in case it exists.
     */
    where: Prisma.StatisticsWhereUniqueInput;
    /**
     * In case the Statistics found by the `where` argument doesn't exist, create a new Statistics with this data.
     */
    create: Prisma.XOR<Prisma.StatisticsCreateInput, Prisma.StatisticsUncheckedCreateInput>;
    /**
     * In case the Statistics was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StatisticsUpdateInput, Prisma.StatisticsUncheckedUpdateInput>;
};
/**
 * Statistics delete
 */
export type StatisticsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
    /**
     * Filter which Statistics to delete.
     */
    where: Prisma.StatisticsWhereUniqueInput;
};
/**
 * Statistics deleteMany
 */
export type StatisticsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Statistics to delete
     */
    where?: Prisma.StatisticsWhereInput;
    /**
     * Limit how many Statistics to delete.
     */
    limit?: number;
};
/**
 * Statistics without action
 */
export type StatisticsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: Prisma.StatisticsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Statistics
     */
    omit?: Prisma.StatisticsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatisticsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Statistics.d.ts.map