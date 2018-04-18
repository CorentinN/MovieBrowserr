<form onSubmit={this.handleSubmit.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}>
                    <input autoComplete="off" type="text" id="searchForm" onChange={this.handleSearch.bind(this)}/>
                </form>
                {this.state.search !== [] && 
                    <div className="searchWrapper">
                        <ul>
                            {this.state.search.map((results,index) => {
                                return (
                                    <li key={index-1} className={`${cursor === index ? 'active' : ''}`}>
                                        <a
                                            key={index -1}
                                            href={results.title}
                                            dataid={results.id}
                                            onClick={this.handleSubmitId.bind(this, results.id)}
                                            >
                                            {results.title}
                                        </a>
                                    </li> 
                                )})}
                        </ul>
                    </div>
                }
               </div>

               <SearchBar 
                        handleSubmitId={this.handleSubmitId.bind(this)}
                        setRedirect={this.setRedirect.bind(this)}
                    />

                   