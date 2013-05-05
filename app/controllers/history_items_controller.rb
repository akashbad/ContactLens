class HistoryItemsController < ApplicationController
  # GET /history_items
  # GET /history_items.json
  def index
    @history_items = HistoryItem.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @history_items }
    end
  end

  # GET /history_items/1
  # GET /history_items/1.json
  def show
    @history_item = HistoryItem.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @history_item }
    end
  end

  # GET /history_items/new
  # GET /history_items/new.json
  def new
    @history_item = HistoryItem.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @history_item }
    end
  end

  # GET /history_items/1/edit
  def edit
    @history_item = HistoryItem.find(params[:id])
  end

  # POST /history_items
  # POST /history_items.json
  def create
    @history_item = HistoryItem.new(params[:history_item])

    respond_to do |format|
      if @history_item.save
        format.html { redirect_to @history_item, notice: 'History item was successfully created.' }
        format.json { render json: @history_item, status: :created, location: @history_item }
      else
        format.html { render action: "new" }
        format.json { render json: @history_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /history_items/1
  # PUT /history_items/1.json
  def update
    @history_item = HistoryItem.find(params[:id])

    respond_to do |format|
      if @history_item.update_attributes(params[:history_item])
        format.html { redirect_to @history_item, notice: 'History item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @history_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /history_items/1
  # DELETE /history_items/1.json
  def destroy
    @history_item = HistoryItem.find(params[:id])
    @history_item.destroy

    respond_to do |format|
      format.html { redirect_to history_items_url }
      format.json { head :no_content }
    end
  end
end
